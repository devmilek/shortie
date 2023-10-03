<p align="center">
  <a href="https://tailwindcss.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/devmilek/shortie/main/HEAD/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/devmilek/shortie/main/HEAD/logo-light.svg">
      <img alt="SHORTIE" src="https://raw.githubusercontent.com/devmilek/shortie/main/HEAD/logo-light.svg" width="350" height="70" style="max-width: 100%;">
    </picture>
  </a>
</p>

<p align="center">
  Simple and user-friendly web application designed to shorten long URLs, making them easier to share and manage.
</p>

## Live version

[Shortie - Tiny links, big resoults!](https://shortie-livid.vercel.app/)

## Key Features

- Shorten long URLs with a single click.
- Generate custom short URLs for better branding and recognition.
- View a history of your shortened links for easy reference.
- Analyze link click-through rates (CTR).
- Access Shortie from any web browser or device.
- Protect links with password
- Set links expiration date
- Generate QR codes for shortned links

## Todo

- [ ] Settings page
- [ ] Get visitor geolocation
- [ ] Statistics page
- [ ] CEO improvments
- [ ] Create favicon.ico
- [ ] Make landing page responsive

## Installation

Shortie is a web-based application, which means there is no need for traditional installation. Users can access it via their web browsers from any device with an internet connection.

However, if you want to deploy Shortie on your own server or make custom modifications, you can follow these steps:

1. Clone the SHORTIE repository from GitHub:

```bash
git clone https://github.com/devmilek/shortie.git
```

2. Install the required dependencies:

```bash
npm install
```

3. Create .env file and create necesary variables witch can specifying your database connection details and Clerk authentication.

```env
DATABASE_URL="<MONGODB_URL>"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<CLERK_KEY>"
CLERK_SECRET_KEY=<CLERK_SECRET_KEY>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/app
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app
```

4. Generate Prisma schema

```bash
npx prisma generate
```

5. Push your schema do database

```bash
npx prisma db push
```

6. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## More information

Shortie using many npm packages among others:

- [Clerk Auth](https://clerk.com/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database provider
- [Prisma](https://www.prisma.io/) - ORM
- [ShadcnUI](https://ui.shadcn.com/) - Component library
- [zustand](https://zustand-demo.pmnd.rs/) - State managment

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

Shortie is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for using Shortie! If you have any questions or encounter any issues, please feel free to contact us at devmilek@gmail.com.
