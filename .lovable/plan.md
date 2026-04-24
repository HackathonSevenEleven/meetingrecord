

# Fix: name-group Edge Function Missing Authentication

## Impact

**Credit exhaustion**: Anyone on the internet can call this function repeatedly with arbitrary text, triggering AI API calls that consume your credits. There is zero authentication — no JWT check, no user verification.

**Prompt injection**: The `texts` array is embedded directly into the AI prompt with no sanitization or size limits. An attacker could pass large or malicious strings to manipulate the AI output or run up costs with oversized prompts.

## Fix — single file: `supabase/functions/name-group/index.ts`

### 1. Add JWT authentication
After the OPTIONS check, extract the `Authorization` header, create a user-context client, and call `getUser()` to verify the caller is a real authenticated user. Reject with 401 if not.

### 2. Add input validation
- Cap `texts` array length (e.g., max 20 items)
- Cap each text string length (e.g., max 500 characters)
- This limits prompt size and reduces abuse surface

### Code sketch
```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// After OPTIONS check:
const authHeader = req.headers.get("Authorization");
if (!authHeader?.startsWith("Bearer ")) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const userClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
  { global: { headers: { Authorization: authHeader } } }
);
const { data: userData, error: userError } = await userClient.auth.getUser();
if (userError || !userData?.user) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Input validation
if (texts.length > 20) { /* reject */ }
const sanitized = texts.map((t: string) => String(t).slice(0, 500));
```

No client-side changes needed — `supabase.functions.invoke()` already sends the auth header automatically.

### Also: Mark the security finding as resolved after applying the fix.

