import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLang } from "../App";
import { useT } from "../i18n";

export function ContactPage() {
  const { lang } = useLang();
  const t = useT(lang);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success(
      lang === "bn"
        ? "বার্তা পাঠানো হয়েছে। ধন্যবাদ!"
        : "Message sent! We'll get back to you soon.",
    );
    setForm({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: lang === "bn" ? "ফোন" : "Phone",
      value: "+880 1700 000000",
    },
    {
      icon: Mail,
      label: lang === "bn" ? "ইমেইল" : "Email",
      value: "info@gazipurhelpingzone.com",
    },
    {
      icon: MapPin,
      label: lang === "bn" ? "ঠিকানা" : "Address",
      value: lang === "bn" ? "গাজীপুর, ঢাকা, বাংলাদেশ" : "Gazipur, Dhaka, Bangladesh",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-10">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t.contact.title}
          </h1>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact Form */}
          <Card
            className="md:col-span-3 shadow-warm-md border-border/60"
            data-ocid="contact.form_card"
          >
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name">{t.contact.name} *</Label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={
                      lang === "bn" ? "আপনার নাম লিখুন" : "Enter your name"
                    }
                    required
                    className="bg-card"
                    data-ocid="contact.name_input"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-email">{t.contact.email}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder={
                      lang === "bn" ? "আপনার ইমেইল লিখুন" : "Enter your email"
                    }
                    className="bg-card"
                    data-ocid="contact.email_input"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-message">{t.contact.message} *</Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder={
                      lang === "bn"
                        ? "আপনার বার্তা লিখুন..."
                        : "Write your message..."
                    }
                    rows={5}
                    required
                    className="bg-card resize-none"
                    data-ocid="contact.message_textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2 self-start"
                  data-ocid="contact.submit_button"
                >
                  <Send size={15} />
                  {submitting
                    ? lang === "bn"
                      ? "পাঠানো হচ্ছে..."
                      : "Sending..."
                    : t.contact.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div
            className="md:col-span-2 flex flex-col gap-4"
            data-ocid="contact.info_section"
          >
            <h2 className="font-display text-lg font-semibold text-foreground">
              {lang === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
            </h2>
            {contactInfo.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/60 shadow-warm"
                data-ocid={`contact.info.${i + 1}`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {value}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-2 p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
              {lang === "bn"
                ? "আপনার সার্ভিস তালিকাভুক্ত করতে চাইলে আমাদের সাথে যোগাযোগ করুন।"
                : "Want to list your service? Contact us and we'll add you to the directory."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
