export default function Loading() {
  return (
    <div className="grid h-svh place-items-center">
      <div className="flex gap-x-4">
        <div className="bg-purple-60 size-6 animate-bounce rounded-full"></div>
        <div className="bg-purple-60 size-6 animate-bounce rounded-full [animation-delay:-.3s]"></div>
        <div className="bg-purple-60 size-6 animate-bounce rounded-full [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
