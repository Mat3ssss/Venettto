"use server";

export type ObjednavkaState = {
  success: boolean;
  message: string;
} | null;

export async function sendObjednavka(
  prevState: ObjednavkaState,
  formData: FormData
): Promise<ObjednavkaState> {
  const jmeno = formData.get("jmeno") as string;
  const telefon = formData.get("telefon") as string;
  const email = formData.get("email") as string;
  const datum = formData.get("datum") as string;
  const cas = formData.get("cas") as string;
  const adresa = formData.get("adresa") as string;
  const pocetOsob = formData.get("pocetOsob") as string;
  const poznamka = formData.get("poznamka") as string;

  if (!jmeno || !telefon || !email || !poznamka) {
    return { success: false, message: "Vyplňte prosím všechna povinná pole." };
  }

  const res = await fetch("https://formspree.io/f/meepkzjb", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      jmeno,
      telefon,
      email,
      ...(datum && { datum }),
      ...(cas && { cas }),
      ...(adresa && { adresa }),
      ...(pocetOsob && { pocetOsob }),
      poznamka,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error("Formspree error:", res.status, body);
    return { success: false, message: `Chyba ${res.status}: ${body?.error ?? "Zkuste to prosím znovu."}` };
  }

  return { success: true, message: "Objednávka byla odeslána. Brzy se vám ozveme!" };
}
