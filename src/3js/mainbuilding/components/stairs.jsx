// stairs.jsx
import React from "react";

export default function UShapedStairs({
  position = [0, 0, 0],
  width = 1.5,
  scale = [1, 1, 1],
  stepCount = 16,
  stepHeight = 0.25,
  stepDepth = 0.4,
  gap = 0.2,
  landingDepth = 2.5,
  landingThickness = 0.2,
  color = "#ecf0f1",
  landingColor = "#bdc3c7"
}) {
  // Directions: flight1 goes in negative Z, flight2 goes opposite (positive Z)
  const dir1 = -1;
  const dir2 = 1;

  // Where flight1 starts (center of first step)
  const flight1StartZ = 1.5; // keep your original starter, can be a prop if you like
  const flight1StepZ = i => flight1StartZ + dir1 * i * stepDepth;
  const flight1StepY = i => (i * stepHeight) + (stepHeight / 2); // center of box

  const flight1TopZ = flight1StepZ(stepCount - 1); // center z of last step in flight1

  // Place landing directly after the last step (no visual gap)
  // landing center Z = lastStepCenterZ + dir1 * ( -STEP_DEPTH/2 - LANDING_DEPTH/2 )
  // which simplifies to:
  const landingCenterZ = flight1TopZ + dir1 * ((stepDepth / 2) + (landingDepth / 2));

  // landing center Y so its top surface aligns with the top of the last step
  // last step top surface is at stepCount * stepHeight
  const landingTopY = stepCount * stepHeight;
  const landingCenterY = landingTopY - (landingThickness / 2);

  // Flight2 starts at the far edge of the landing, then continues with steps in dir2
  const flight2StartZ = landingCenterZ + dir2 * ((landingDepth / 2) + (stepDepth / 2));
  const flight2StepZ = i => flight2StartZ + dir2 * i * stepDepth;
  const flight2StepY = i => landingTopY + (i * stepHeight) + (stepHeight / 2);

  // X positions for the two flights (left and right of the landing)
  const flight1X = -(width / 2 + gap);
  const flight2X = (width / 2 + gap);

  return (
    <group position={position} scale={scale}>
      {/* Flight 1 */}
      {Array.from({ length: stepCount }).map((_, i) => (
        <mesh
          key={`s1-${i}`}
          position={[flight1X, flight1StepY(i), flight1StepZ(i)]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[width, stepHeight, stepDepth]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* Landing */}
      <mesh
        position={[0, landingCenterY, landingCenterZ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width * 2 + gap * 2 + 0.2, landingThickness, landingDepth]} />
        <meshStandardMaterial color={landingColor} />
      </mesh>

      {/* Flight 2 */}
      {Array.from({ length: stepCount }).map((_, i) => (
        <mesh
          key={`s2-${i}`}
          position={[flight2X, flight2StepY(i), flight2StepZ(i)]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[width, stepHeight, stepDepth]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}
