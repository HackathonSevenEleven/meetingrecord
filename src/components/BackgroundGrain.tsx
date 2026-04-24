
export const BackgroundGrain = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url('/images/grain.png')`,
        backgroundSize: `100px 100px`,
        backgroundRepeat: `repeat`,
        backgroundBlendMode: `overlay`,
        backgroundPosition: `left top`,
        mixBlendMode: "overlay",
      }}
    />
  );
};
