"use client";

import { supabase } from "@/lib/supabase/supabase";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FiArrowLeft, FiExternalLink, FiSave, FiX } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Database } from "@/types/supabase";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
const parentLabels = ["Far", "Mor", "Farfar", "Farmor", "Morfar", "Mormor", "Farfars far", "Farfars mor", "Farmors far", "Farmors mor", "Morfars far", "Morfars mor", "Mormors far", "Mormors mor"];
const fields = [
  { label: "Registrerat namn", name: "name" }, { label: "Tilltalsnamn", name: "nickname" },
  { label: "Ras", name: "breed" }, { label: "Kön", name: "gender" },
  { label: "Hårlag", name: "hair_type" }, { label: "Registreringsnummer", name: "reg_nr" },
  { label: "Färg", name: "color" }, { label: "Födelsedatum", name: "birth_date" },
] as const;
const healthFields = [{ label: "IVDD", name: "ivdd" }, { label: "BPH", name: "bph" }, { label: "Ögon", name: "eye" }] as const;

export default function UpdateDog() {
  const { id } = useParams<{ id: string }>();
  const [dog, setDog] = useState<Dog | null>(null);
  const [formData, setFormData] = useState<Partial<Dog>>({});
  const [image, setImage] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const busyRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setLoadError("");
    axios.get<Dog>(`${serverURL}/dogs/${id}`, { signal: controller.signal, withCredentials: true })
      .then(({ data }) => {
        setDog(data);
        setFormData({ name: data.name, nickname: data.nickname, breed: data.breed, gender: data.gender, hair_type: data.hair_type, reg_nr: data.reg_nr, color: data.color, ivdd: data.ivdd, bph: data.bph, eye: data.eye, birth_date: data.birth_date, description: data.description, titles: data.titles ?? [], pedigree: data.pedigree ?? [], image: data.image ?? [] });
        setImage(null); setSelectedImg(null); setNewTitle("");
      })
      .catch(() => { if (!controller.signal.aborted) setLoadError("Kunde inte hämta hunden. Ladda om sidan för att försöka igen."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value || null }));
  }

  async function authorization() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Din session har gått ut. Logga in igen för att spara.");
    return `Bearer ${session.access_token}`;
  }

  function reportError(error: unknown) {
    toast.error(axios.isAxiosError(error) ? error.response?.data?.message || "Kunde inte spara. Försök igen." : error instanceof Error ? error.message : "Något gick fel.");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!dog || busyRef.current) return;
    busyRef.current = true; setSaving(true);
    try {
      await axios.put(`${serverURL}/dogs/${dog.id}`, { ...formData, size: dog.size, angel_dog: dog.angel_dog, hairType: formData.hair_type ?? "", regNr: formData.reg_nr ?? "", birthDate: formData.birth_date ?? "", file: image }, { headers: { "Content-Type": "multipart/form-data", Authorization: await authorization() }, withCredentials: true });
      // Fetch the saved record so uploaded image keys come from the server.
      const { data } = await axios.get<Dog>(`${serverURL}/dogs/${dog.id}`, { withCredentials: true });
      setDog(data); setFormData((previous) => ({ ...previous, image: data.image ?? [] }));
      setImage(null); setSelectedImg(null);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Hundens uppgifter har sparats.");
    } catch (error) { reportError(error); }
    finally { busyRef.current = false; setSaving(false); }
  }

  async function removeImage() {
    if (!dog || !selectedImg || busyRef.current) return;
    busyRef.current = true; setRemoving(true);
    const images = formData.image?.filter((item) => item !== selectedImg) ?? [];
    try {
      await axios.patch(`${serverURL}/dogs/${dog.id}`, { image: images }, { headers: { Authorization: await authorization() }, withCredentials: true });
      setFormData((previous) => ({ ...previous, image: images })); setSelectedImg(null);
      toast.success("Bilden har tagits bort.");
    } catch (error) { reportError(error); }
    finally { busyRef.current = false; setRemoving(false); }
  }

  function updateParent(index: number, key: "name" | "titles", value: string) {
    setFormData((previous) => {
      const pedigree = Array.from({ length: Math.max(14, previous.pedigree?.length ?? 0) }, (_, position) => previous.pedigree?.[position] ?? { name: "", titles: "" });
      pedigree[index] = { ...pedigree[index], [key]: value };
      return { ...previous, pedigree };
    });
  }

  return (
    <main className="admin-dog-editor">
      <Link href="/admin/dogs" className="admin-dog-back"><FiArrowLeft aria-hidden="true" /> Till hundöversikten</Link>
      {loading ? <p role="status" className="admin-dog-state">Hämtar hundens uppgifter…</p> : loadError ? <p role="alert" className="admin-dog-state">{loadError}</p> : dog && <>
        <header className="admin-dog-heading"><div><p className="site-eyebrow">Hundar / Redigera</p><h1>{dog.nickname || dog.name}</h1><p>{dog.name}</p></div><Link href={`/dogs/${encodeURIComponent(dog.nickname)}`} target="_blank" rel="noopener noreferrer" className="admin-dog-secondary">Visa hundsidan <FiExternalLink aria-hidden="true" /></Link></header>
        <form onSubmit={onSubmit} aria-busy={saving || removing}><fieldset disabled={saving || removing} className="admin-dog-fieldset"><legend className="sr-only">Redigera hundens uppgifter</legend>
          <div className="admin-dog-columns"><div className="admin-dog-main">
            <section className="admin-dog-panel" aria-labelledby="dog-basics"><h2 id="dog-basics">Grunduppgifter</h2><p>Visas på hundens publika sida. Namn och tilltalsnamn är obligatoriska.</p><div className="admin-dog-fields">{fields.map((field) => <div className="admin-dog-field" key={field.name}><label htmlFor={`dog-${field.name}`}>{field.label}</label><input id={`dog-${field.name}`} name={field.name} value={formData[field.name] ?? ""} onChange={handleChange} required={field.name === "name" || field.name === "nickname"} /></div>)}</div></section>
            <section className="admin-dog-panel" aria-labelledby="dog-description"><h2 id="dog-description">Beskrivning</h2><p>Berätta om hundens personlighet och vardag.</p><label htmlFor="dog-description-text" className="sr-only">Beskrivning av hunden</label><textarea id="dog-description-text" name="description" rows={6} value={formData.description ?? ""} onChange={handleChange} /></section>
            <section className="admin-dog-panel" aria-labelledby="dog-images"><h2 id="dog-images">Bilder</h2><p>Första bilden används på hundöversikten. Välj en bild nedan om du vill ta bort den.</p><div className="admin-dog-upload"><label htmlFor="dog-file">Lägg till en bild</label><input ref={fileRef} id="dog-file" type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] ?? null)} /><span>{image ? `${image.name} laddas upp när du sparar.` : "Den nya bilden laddas upp när du sparar ändringarna."}</span></div><div className="admin-dog-images">{formData.image?.map((item, index) => <button type="button" key={`${item}-${index}`} className={selectedImg === item ? "admin-dog-image is-selected" : "admin-dog-image"} aria-label={`Välj bild ${index + 1}`} aria-pressed={selectedImg === item} onClick={() => setSelectedImg(selectedImg === item ? null : item)}><Image src={`${assetUrl}${item}`} alt={`${dog.nickname}, bild ${index + 1}`} width={300} height={220} unoptimized />{index === 0 && <span>Omslagsbild</span>}</button>)}</div>{!formData.image?.length && <p>Inga bilder tillagda ännu.</p>}{selectedImg && <div className="admin-dog-image-actions"><button type="button" className="admin-dog-danger" onClick={removeImage}>{removing ? "Tar bort…" : "Ta bort vald bild"}</button><span>Bilden tas bort direkt. Övriga ändringar sparas separat.</span></div>}</section>
          </div><aside className="admin-dog-aside">
            <section className="admin-dog-panel" aria-labelledby="dog-health"><h2 id="dog-health">Hälsa &amp; mentalitet</h2><p>Ange resultat och undersökningar.</p>{healthFields.map((field) => <div className="admin-dog-field" key={field.name}><label htmlFor={`dog-${field.name}`}>{field.label}</label><input id={`dog-${field.name}`} name={field.name} value={formData[field.name] ?? ""} onChange={handleChange} /></div>)}</section>
            <section className="admin-dog-panel" aria-labelledby="dog-titles"><h2 id="dog-titles">Titlar &amp; meriter</h2><ul className="admin-dog-titles">{formData.titles?.map((title, index) => <li key={index}><span>{title}</span><button type="button" aria-label={`Ta bort titeln ${title}`} onClick={() => setFormData((previous) => ({ ...previous, titles: previous.titles?.filter((_, position) => position !== index) }))}><FiX aria-hidden="true" /></button></li>)}</ul><div className="admin-dog-field"><label htmlFor="dog-new-title">Ny titel</label><input id="dog-new-title" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} /></div><button type="button" className="admin-dog-secondary" disabled={!newTitle.trim()} onClick={() => { setFormData((previous) => ({ ...previous, titles: [...(previous.titles ?? []), newTitle.trim()] })); setNewTitle(""); }}>Lägg till titel</button></section>
          </aside></div>
          <section className="admin-dog-panel admin-dog-pedigree" aria-labelledby="dog-pedigree"><h2 id="dog-pedigree">Stamtavla</h2><p>Fyll i namn och eventuella titlar på rätt plats. Lämna okända släktingar tomma.</p>{[{ start: 0, end: 2, title: "Föräldrar" }, { start: 2, end: 6, title: "Generation 2" }, { start: 6, end: 14, title: "Generation 3" }].map((group) => <div key={group.start} className="admin-dog-generation"><h3>{group.title}</h3><div>{parentLabels.slice(group.start, group.end).map((label, offset) => { const index = group.start + offset; return <div key={index} className="admin-dog-parent"><h4>{label}</h4><label htmlFor={`parent-${index}-name`}>Namn</label><input id={`parent-${index}-name`} value={formData.pedigree?.[index]?.name ?? ""} onChange={(event) => updateParent(index, "name", event.target.value)} /><label htmlFor={`parent-${index}-titles`}>Titlar</label><input id={`parent-${index}-titles`} value={formData.pedigree?.[index]?.titles ?? ""} onChange={(event) => updateParent(index, "titles", event.target.value)} /></div>; })}</div></div>)}</section>
          <div className="admin-dog-savebar"><span>{saving ? "Sparar hundens uppgifter…" : "Spara för att publicera dina ändringar på hundsidan."}</span><button type="submit" className="site-button site-button-green"><FiSave aria-hidden="true" />{saving ? "Sparar…" : "Spara ändringar"}</button></div>
        </fieldset></form>
      </>}
    </main>
  );
}
