import './globals.css';
import { AuthProvider } from '@/app/context/AuthContext';
import ClientLayout from '@/app/components/ClientLayout';

export const metadata = {
  title: 'Agentic AI Career Coach',
  description: 'Your AI-powered career mentorship platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" async></script>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
        <style>{`
          :root {
            --on-surface-variant: #c2c6d6;
            --primary-container: #4d8eff;
            --on-tertiary: #233143;
            --primary-fixed: #d8e2ff;
            --on-background: #dae2fd;
            --surface-dim: #0b1326;
            --surface-tint: #adc6ff;
            --on-surface: #dae2fd;
            --primary: #adc6ff;
            --secondary: #4edea3;
            --surface: #0b1326;
            --surface-container: #171f33;
            --surface-container-low: #131b2e;
            --surface-container-high: #222a3d;
            --surface-container-highest: #2d3449;
          }
          html {
            color-scheme: dark;
          }
          body {
            background: #0b1326;
            color: #dae2fd;
            font-family: Inter, sans-serif;
          }
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
          }
          .glass-panel {
            background: rgba(45, 52, 73, 0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
          .ai-pulse {
            box-shadow: 0 0 15px rgba(173, 198, 255, 0.6);
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
        `}</style>
      </head>
      <body className="bg-[#0b1326] text-[#dae2fd]">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
