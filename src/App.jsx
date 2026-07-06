import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { useTheme } from './components/ThemeToggle'

import Home from './pages/Home'
import About from './pages/About'
import Hikes from './pages/Hikes'
import Beaches from './pages/Beaches'
import Travels from './pages/Travels'
import PostDetail from './pages/PostDetail'
import NotFound from './pages/NotFound'

// Wraps each page in a subtle fade transition.
function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const [dark, toggleTheme] = useTheme()
  const location = useLocation()

  return (
    // reducedMotion="user" makes every animation respect the visitor's
    // system "reduce motion" accessibility setting automatically.
    <MotionConfig reducedMotion="user">
      <div className="bg-paper text-ink dark:bg-night dark:text-[#ECEBE4] transition-colors duration-300">
        <Navbar dark={dark} onToggle={toggleTheme} />
        <ScrollToTop />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/hikes" element={<Page><Hikes /></Page>} />
            <Route path="/hikes/:slug" element={<Page><PostDetail kind="hike" /></Page>} />
            <Route path="/beaches" element={<Page><Beaches /></Page>} />
            <Route path="/beaches/:slug" element={<Page><PostDetail kind="beach" /></Page>} />
            <Route path="/travels" element={<Page><Travels /></Page>} />
            <Route path="/travels/:slug" element={<Page><PostDetail kind="travel" /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </MotionConfig>
  )
}
