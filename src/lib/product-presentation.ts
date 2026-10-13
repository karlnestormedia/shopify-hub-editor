export const deliveryWindow = { minDays: 1, maxDays: 3 } as const;

export function formatDeliveryWindow() {
  return `${deliveryWindow.minDays}-${deliveryWindow.maxDays} dagars leveranstid`;
}

export const productImagePlans = [
  { title: "Sirap i måttet", instruction: "Närbild på Foldit vikt som ett mått, fyllt med sirap. Visa formen och innehållet tydligt." },
  { title: "Skrapa av sirapen", instruction: "Foldit viks ut och sirapen skrapas av mot bunkens kant. Visa handen, måttet och sirapen i samma bild." },
  { title: "Skölj av måttet", instruction: "Foldit helt utvikt under rinnande vatten. Visa hur den plana ytan sköljs ren." },
  { title: "Platt i kökslådan", instruction: "Foldit ligger utvikt och platt i en prydlig kökslåda, bredvid andra köksredskap." },
  { title: "Tre mått i ett", instruction: "Tredelad produktbild: Foldit vikt i vart och ett av sina tre mått. En tydlig måttetikett under varje del." },
] as const;