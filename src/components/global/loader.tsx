import LatticeLoader from "../react-bits/LatticeLoader";

export default function Loader() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <LatticeLoader
        status="working"
        label="Thinking"
        doneLabel="Done in"
        errorLabel="Failed after"
        pattern="orbit"
        grid={3}
        shape="round"
        doneColor="#22c55e"
        errorColor="#ef4444"
        cellSize={6}
        gap={2}
        fontSize={14}
        step={90}
        idleOpacity={0.15}
        glow={false}
        glowColor=""
        showTimer
        color="#f5f5f5"
      />
    </div>
  )
}
