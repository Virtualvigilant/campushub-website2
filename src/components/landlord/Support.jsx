import { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

export default function Support() {
  const { user } = useAuth(); // optional, prefill email
  const [form, setForm] = useState({
    name: user?.username || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      // Mock API call
      // Replace with your backend endpoint
      await new Promise((res) => setTimeout(res, 1000));

      setFeedback("Your message has been sent successfully!");
      setForm({ ...form, subject: "", message: "" });
    } catch (err) {
      setFeedback("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contact Support</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Subject</label>
          <Input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Message</label>
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            required
            rows={5}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Message"}
        </Button>

        {feedback && (
          <p className={`mt-2 text-sm ${feedback.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
      </form>
    </div>
  );
}
