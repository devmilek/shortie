import { Feature } from "@/types";
import {
  CalendarIcon,
  Lock,
  LockIcon,
  PieChartIcon,
  QrCodeIcon,
} from "lucide-react";

import qrcode from "@/assets/qrcode.png";
import statictics from "@/assets/statistics.png";
import password from "@/assets/password.png";
import expirationdate from "@/assets/expirationdate.png";

import qrcode_dark from "@/assets/qrcode-dark.png";
import statictics_dark from "@/assets/statictics-dark.png";
import password_dark from "@/assets/password-dark.png";
import expirationdate_dark from "@/assets/expirationdate-dark.png";

export const features: Feature[] = [
  {
    id: 1,
    slug: "protect-password",
    icon: LockIcon,
    image: password,
    darkImage: password_dark,
    title: "Protect with password",
    content:
      "Secure your valuable links and data by adding an extra layer of protection. With our password protection feature, you control who can access your shared content.",
  },
  {
    id: 2,
    slug: "manage-date",
    icon: CalendarIcon,
    image: expirationdate,
    darkImage: expirationdate_dark,
    title: "Manage expiration date",
    content:
      "Take control of your shared links by setting expiration dates. Ensure that your content remains accessible only for as long as you want it to, enhancing your link management capabilities.",
  },
  {
    id: 3,
    slug: "link-stats",
    icon: PieChartIcon,
    image: statictics,
    darkImage: statictics_dark,
    title: "Link statics",
    content:
      "Get valuable insights into the performance of your shared links. Our analytics feature provides you with detailed information on the number of visitors, helping you measure the impact of your content and campaigns.",
  },
  {
    id: 4,
    slug: "generate-qr",
    icon: QrCodeIcon,
    image: qrcode,
    darkImage: qrcode_dark,
    title: "Generate QR codes",
    content:
      "Simplify link sharing with QR codes. Create QR codes for your links effortlessly, making it convenient for users to access your content by simply scanning the code with their mobile devices.",
  },
];
