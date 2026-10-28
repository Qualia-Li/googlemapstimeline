/** Google tag (gtag.js), rendered inside <head> by every root layout. */
export default function Analytics() {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-2X617E3BDW"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2X617E3BDW');
            `,
        }}
      />
    </>
  );
}
