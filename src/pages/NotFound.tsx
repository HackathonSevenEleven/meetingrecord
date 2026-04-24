import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-5xl font-semibold tracking-tight text-foreground mb-3">
      404
    </h1>
    <p className="text-muted-foreground mb-6">
      The page you're looking for doesn't exist.
    </p>
    <Button asChild>
      <Link to="/">Go home</Link>
    </Button>
  </div>
);

export default NotFound;
