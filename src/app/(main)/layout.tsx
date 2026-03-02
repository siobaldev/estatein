import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import * as motion from "motion/react-client";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-20 md:mt-25 lg:mt-30 xl:mt-37.5"
      >
        <Footer />
      </motion.div>
    </>
  );
}
