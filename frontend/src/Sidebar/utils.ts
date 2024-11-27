type WaveDangerAssessment = {
  gaugeAngle: number;
  title: string;
  color: string;
};

export function assessWaveDanger(waveHeight: number): WaveDangerAssessment {
  if (waveHeight < 0) {
    throw new Error("Wave height cannot be negative.");
  }

  const gaugeAngle: number = (waveHeight / 20) * 180;
  let title: string;
  if (waveHeight <= 1.5) {
    title = "Safe (Calm to Moderate)";
  } else if (waveHeight <= 2.5) {
    title = "Caution (Moderate Waves)";
  } else if (waveHeight <= 4) {
    title = "Dangerous (Rough Seas)";
  } else {
    title = "Highly Hazardous (Very Rough or Higher)";
  }

  // Generate a continuous color gradient (green to red)
  const color = getColorFromGaugeAngle(gaugeAngle);

  return { gaugeAngle, title, color };
}

function getColorFromGaugeAngle(gaugeAngle: number): string {
  // Define the start (green) and end (red) colors
  const startColor = { r: 0, g: 255, b: 0 }; // Green
  const endColor = { r: 255, g: 0, b: 0 }; // Red

  // Interpolate between the start and end colors based on the gaugeAngle
  const r = Math.round(
    startColor.r + (endColor.r - startColor.r) * (gaugeAngle / 180)
  );
  const g = Math.round(
    startColor.g + (endColor.g - startColor.g) * (gaugeAngle / 180)
  );
  const b = Math.round(
    startColor.b + (endColor.b - startColor.b) * (gaugeAngle / 180)
  );

  return `rgb(${r}, ${g}, ${b})`;
}
