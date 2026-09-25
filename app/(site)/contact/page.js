import { Mail, Phone, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/site/ContactForm";
import { getProfile } from "@/lib/data";

export const metadata = {
  title: "Contact — Jonathan Okana",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto max-w-content px-6 py-20">
      <SectionHeading
        index="03"
        title="Contact"
        description="Une proposition d'alternance, une mission freelance ou juste une question ? Écris-moi."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-5 p-6">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-start gap-3 text-sm text-ink-200 hover:text-mint-300"
              >
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-mint-300" />
                {profile.email}
              </a>
            )}
            {profile?.telephone && (
              <a
                href={`tel:${profile.telephone.replace(/\s/g, "")}`}
                className="flex items-start gap-3 text-sm text-ink-200 hover:text-mint-300"
              >
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-mint-300" />
                {profile.telephone}
              </a>
            )}
            {profile?.localisation && (
              <p className="flex items-start gap-3 text-sm text-ink-200">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-mint-300" />
                {profile.localisation}
              </p>
            )}
          </Card>

          {profile?.disponibilite && (
            <Card className="p-6">
              <p className="font-mono text-xs text-ink-400">Disponibilité</p>
              <p className="mt-2 text-sm text-ink-200">{profile.disponibilite}</p>
            </Card>
          )}
        </div>

        <Card className="p-8">
          <ContactForm />
        </Card>
      </div>
    </div>
  );
}
