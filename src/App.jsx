import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowDownWideNarrow, ArrowRight, Bookmark, Check, ChevronDown,
  Clapperboard, Compass, Film, Heart, Info, LogIn, Menu, Play, Search, Sparkles,
  Star, Ticket, TrendingUp, UserRound, WandSparkles, X,
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB = 'https://api.themoviedb.org/3'
const IMAGE = 'https://image.tmdb.org/t/p/'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const seedMovies = [
  { id: 693134, title: 'Dune: Part Two', release_date: '2024-02-27', vote_average: 8.2, genre_ids: [878, 12, 28], poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg', overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', original_language: 'en', runtime: 167, director: 'Denis Villeneuve', cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'] },
  { id: 157336, title: 'Interstellar', release_date: '2014-11-05', vote_average: 8.7, genre_ids: [12, 18, 878], poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg', overview: 'When Earth becomes uninhabitable, a team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.', original_language: 'en', runtime: 169, director: 'Christopher Nolan', cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'] },
  { id: 872585, title: 'Oppenheimer', release_date: '2023-07-19', vote_average: 8.1, genre_ids: [18, 36], poster_path: '/ptpr0kGAckfQkJeJIt8st5dglvd.jpg', backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', overview: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.', original_language: 'en', runtime: 181, director: 'Christopher Nolan', cast: ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.'] },
  { id: 792307, title: 'Poor Things', release_date: '2023-12-07', vote_average: 7.8, genre_ids: [878, 10749, 35], poster_path: '/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', backdrop_path: '/jBPG5F5WW2qv5diBzxUr52sPMef.jpg', overview: 'The incredible tale and fantastical evolution of Bella Baxter, a young woman brought back to life by a brilliant scientist.', original_language: 'en', runtime: 141, director: 'Yorgos Lanthimos', cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe'] },
  { id: 569094, title: 'Spider-Man: Across the Spider-Verse', release_date: '2023-05-31', vote_average: 8.4, genre_ids: [16, 28, 12], poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', backdrop_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg', overview: 'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence.', original_language: 'en', runtime: 140, director: 'Joaquim Dos Santos', cast: ['Shameik Moore', 'Hailee Steinfeld', 'Brian Tyree Henry'] },
  { id: 414906, title: 'The Batman', release_date: '2022-03-01', vote_average: 7.7, genre_ids: [80, 9648, 53], poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg', backdrop_path: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg', overview: 'Batman ventures into Gotham City’s underworld when a sadistic killer leaves behind a trail of cryptic clues.', original_language: 'en', runtime: 177, director: 'Matt Reeves', cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'] },
  { id: 666277, title: 'Past Lives', release_date: '2023-06-02', vote_average: 7.8, genre_ids: [18, 10749], poster_path: '/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg', backdrop_path: '/q3uxO8PK7sL4mQz2kEcDq9JYf2T.jpg', overview: 'Two deeply connected childhood friends are wrested apart after one family emigrates from South Korea.', original_language: 'en', runtime: 106, director: 'Celine Song', cast: ['Greta Lee', 'Teo Yoo', 'John Magaro'] },
  { id: 438631, title: 'Dune', release_date: '2021-09-15', vote_average: 7.8, genre_ids: [878, 12], poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', backdrop_path: '/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg', overview: 'Paul Atreides arrives on Arrakis, a dangerous desert planet that holds the most precious resource in the universe.', original_language: 'en', runtime: 155, director: 'Denis Villeneuve', cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac'] },
  { id: 545611, title: 'Everything Everywhere All at Once', release_date: '2022-03-24', vote_average: 7.8, genre_ids: [28, 12, 878], poster_path: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', backdrop_path: '/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg', overview: 'An exhausted Chinese American woman gets swept up in an insane adventure where she alone can save existence.', original_language: 'en', runtime: 140, director: 'Daniel Kwan & Daniel Scheinert', cast: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan'] },
  { id: 335984, title: 'Blade Runner 2049', release_date: '2017-10-04', vote_average: 8.0, genre_ids: [878, 18, 9648], poster_path: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', backdrop_path: '/ilRyazdMJwN05exqhwK4tMKBYZs.jpg', overview: 'Young Blade Runner K discovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard.', original_language: 'en', runtime: 164, director: 'Denis Villeneuve', cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'] },
  { id: 438695, title: 'Sing 2', release_date: '2021-12-01', vote_average: 7.9, genre_ids: [16, 35, 10751], poster_path: '/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg', backdrop_path: '/tutaKitJJIaqZPyMz7rxrhb4Yxm.jpg', overview: 'Buster Moon and his all-star cast of performers prepare to launch their most dazzling stage show yet.', original_language: 'en', runtime: 110, director: 'Garth Jennings', cast: ['Matthew McConaughey', 'Reese Witherspoon', 'Scarlett Johansson'] },
  { id: 438148, title: 'Minari', release_date: '2020-01-26', vote_average: 7.4, genre_ids: [18], poster_path: '/6VJ8r8nQ9v5Qb1q5M5JpJ7x8V7A.jpg', backdrop_path: '/1oK98sxofUKuufv3Q0fD9qSKS8Y.jpg', overview: 'A Korean American family moves to an Arkansas farm in search of their own American dream.', original_language: 'en', runtime: 115, director: 'Lee Isaac Chung', cast: ['Steven Yeun', 'Yeri Han', 'Alan Kim'] },
]

const genres = [
  { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' }, { id: 14, name: 'Fantasy' }, { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' }, { id: 878, name: 'Sci-Fi' }, { id: 53, name: 'Thriller' },
]
const moods = [
  { label: 'Feel something', icon: '✦', genres: [18, 10749] },
  { label: 'Big adventure', icon: '↗', genres: [12, 28] },
  { label: 'Mind-bending', icon: '◉', genres: [878, 9648] },
  { label: 'Light & lovely', icon: '☼', genres: [35, 10751] },
]
const navItems = [
  { id: 'home', label: 'Discover', icon: Compass },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'watchlist', label: 'My watchlist', icon: Bookmark },
  { id: 'favorites', label: 'Favorites', icon: Heart },
]
const titleCase = (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : ''
const movieId = (movie) => String(movie.id)
const posterUrl = (movie, size = 'w500') => movie.poster_path ? `${IMAGE}${size}${movie.poster_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80'
const backdropUrl = (movie) => movie.backdrop_path ? `${IMAGE}original${movie.backdrop_path}` : posterUrl(movie, 'w780')
const prettyRuntime = (minutes) => minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : ''

function App() {
  const [activePage, setActivePage] = useState('home')
  const [movies, setMovies] = useState(seedMovies)
  const [collections, setCollections] = useState({
    trending: seedMovies.slice(0, 8),
    popular: seedMovies.slice(2, 10),
    topRated: seedMovies.slice(1, 9),
    upcoming: [],
  })
  const [featured, setFeatured] = useState(seedMovies[0])
  const [loading, setLoading] = useState(Boolean(TMDB_KEY))
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [minRating, setMinRating] = useState('')
  const [selectedMood, setSelectedMood] = useState(() => localStorage.getItem('reelgood-mood') || null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authMessage, setAuthMessage] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [user, setUser] = useState(null)
  const [profileMenu, setProfileMenu] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('reelgood-watchlist') || '{}') }
    catch { return {} }
  })
  const [syncReady, setSyncReady] = useState(!supabase)

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setSyncReady(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (supabase) return
    try { localStorage.setItem('reelgood-watchlist', JSON.stringify(items)) }
    catch { queueMicrotask(() => setError('Your browser storage is full. Some watchlist changes may not be saved.')) }
  }, [items])

  useEffect(() => {
    if (!supabase || !user) {
      if (supabase && !user) {
        queueMicrotask(() => {
          try { setItems(JSON.parse(localStorage.getItem('reelgood-watchlist') || '{}')) }
          catch { setItems({}) }
          setSyncReady(true)
        })
      }
      return
    }
    let cancelled = false
    async function loadWatchlist() {
      const [{ data, error: fetchError }, { data: preference, error: preferenceError }] = await Promise.all([
        supabase.from('watchlist').select('movie_id,movie,watched,favorite,rating').eq('user_id', user.id),
        supabase.from('user_preferences').select('preferences').eq('user_id', user.id).maybeSingle(),
      ])
      if (cancelled) return
      if (fetchError) {
        setError(`Could not sync your watchlist: ${fetchError.message}. Check your Supabase setup.`)
      } else if (data) {
        const synced = Object.fromEntries(data.map((row) => [String(row.movie_id), {
          movie: row.movie, watched: row.watched, favorite: row.favorite, rating: row.rating,
        }]))
        setItems(synced)
      }
      if (preferenceError) setError(`Could not load your preferences: ${preferenceError.message}`)
      else if (preference?.preferences?.mood) {
        setSelectedMood(preference.preferences.mood)
        setSelectedGenre(String(moods.find((mood) => mood.label === preference.preferences.mood)?.genres[0] || ''))
      }
      setSyncReady(true)
    }
    loadWatchlist()
    return () => { cancelled = true }
  }, [user])

  useEffect(() => {
    if (!TMDB_KEY) return
    let cancelled = false
    const options = { headers: { accept: 'application/json', Authorization: `Bearer ${TMDB_KEY}` } }
    async function loadMovies() {
      try {
        const endpoints = ['trending/movie/week', 'movie/popular', 'movie/top_rated', 'movie/upcoming']
        const responses = await Promise.all(endpoints.map(async (endpoint) => {
          const response = await fetch(`${TMDB}/${endpoint}?language=en-US&page=1`, options)
          if (!response.ok) throw new Error(`TMDB returned ${response.status}. Check your API key.`)
          return response.json()
        }))
        if (cancelled) return
        const unique = new Map()
        responses.flatMap((response) => response.results || []).forEach((movie) => unique.set(movie.id, movie))
        const liveMovies = [...unique.values()].filter((movie) => movie.poster_path)
        setMovies(liveMovies)
        setCollections({
          trending: responses[0].results || [],
          popular: responses[1].results || [],
          topRated: responses[2].results || [],
          upcoming: responses[3].results || [],
        })
        setFeatured(responses[0].results?.find((movie) => movie.backdrop_path) || liveMovies[0] || seedMovies[0])
      } catch (loadError) {
        if (!cancelled) setError(`${loadError.message} Showing a curated selection instead.`)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadMovies()
    return () => { cancelled = true }
  }, [])

  const updateItem = useCallback((movie, updates) => {
    const key = movieId(movie)
    setItems((current) => {
      const existing = current[key] || { movie, watched: false, favorite: false, rating: 0 }
      const next = { ...current, [key]: { ...existing, ...updates, movie } }
      if (supabase && user && syncReady) {
        const row = {
          user_id: user.id, movie_id: Number(movie.id), movie,
          watched: next[key].watched, favorite: next[key].favorite, rating: next[key].rating,
        }
        supabase.from('watchlist').upsert(row, { onConflict: 'user_id,movie_id' }).then(({ error: syncError }) => {
          if (syncError) setError(`Could not save this movie: ${syncError.message}`)
        })
      }
      return next
    })
  }, [user, syncReady])

  const removeItem = (movie) => {
    const key = movieId(movie)
    setItems((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
    if (supabase && user && syncReady) {
      supabase.from('watchlist').delete().eq('user_id', user.id).eq('movie_id', Number(movie.id))
        .then(({ error: syncError }) => { if (syncError) setError(`Could not remove this movie: ${syncError.message}`) })
    }
  }

  const toggleWatchlist = (movie) => {
    if (items[movieId(movie)]) removeItem(movie)
    else updateItem(movie, { watched: false, favorite: false, rating: 0 })
  }

  const submitSearch = async (event) => {
    event?.preventDefault()
    setActivePage('home')
    setSelectedMood(null)
    if (!search.trim()) {
      setSearchResults(null)
      return
    }
    if (!TMDB_KEY) {
      const query = search.trim().toLowerCase()
      setSearchResults(movies.filter((movie) => movie.title?.toLowerCase().includes(query)))
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${TMDB}/search/movie?query=${encodeURIComponent(search.trim())}&include_adult=false&language=en-US&page=1`, {
        headers: { Authorization: `Bearer ${TMDB_KEY}` },
      })
      if (!response.ok) throw new Error(`Search failed (${response.status}). Try again.`)
      const data = await response.json()
      setSearchResults(data.results || [])
    } catch (searchError) {
      setError(searchError.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleMood = (mood) => {
    const nextMood = selectedMood === mood.label ? null : mood.label
    setSelectedMood(nextMood)
    setSelectedGenre(nextMood ? String(mood.genres[0]) : '')
    try {
      if (nextMood) localStorage.setItem('reelgood-mood', nextMood)
      else localStorage.removeItem('reelgood-mood')
    } catch { setError('Your browser could not save this preference.') }
    if (supabase && user) {
      supabase.from('user_preferences').upsert({
        user_id: user.id,
        preferences: { mood: nextMood },
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' }).then(({ error: saveError }) => {
        if (saveError) setError(`Could not save your preferences: ${saveError.message}`)
      })
    }
    setSearchResults(null)
    setActivePage('home')
  }

  const filtered = useMemo(() => {
    let result = activePage === 'watchlist'
      ? Object.values(items).map((item) => item.movie).filter(Boolean)
      : activePage === 'favorites'
        ? Object.values(items).filter((item) => item.favorite).map((item) => item.movie).filter(Boolean)
        : activePage === 'trending' ? movies : (searchResults ?? movies)
    if (selectedGenre) result = result.filter((movie) => (movie.genre_ids || movie.genres?.map((genre) => genre.id) || []).includes(Number(selectedGenre)))
    if (selectedYear) result = result.filter((movie) => movie.release_date?.startsWith(selectedYear))
    if (selectedLanguage) result = result.filter((movie) => movie.original_language === selectedLanguage)
    if (minRating) result = result.filter((movie) => Number(movie.vote_average) >= Number(minRating))
    return result
  }, [activePage, items, movies, searchResults, selectedGenre, selectedYear, selectedLanguage, minRating])

  const visibleMovies = filtered.filter((movie, index, list) => list.findIndex((item) => item.id === movie.id) === index)
  const hasFilters = Boolean(selectedGenre || selectedYear || selectedLanguage || minRating)
  const clearFilters = () => { setSelectedGenre(''); setSelectedYear(''); setSelectedLanguage(''); setMinRating(''); setSelectedMood(null) }

  const surpriseMe = () => {
    const pool = visibleMovies.length ? visibleMovies : movies
    const randomMovie = pool[Math.floor(Math.random() * pool.length)] || seedMovies[0]
    setSearchResults(null)
    setSelectedMovie(randomMovie)
  }

  const signOut = async () => {
    if (supabase) {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) setError(`Could not sign out: ${signOutError.message}`)
    }
    setUser(null)
    setProfileMenu(false)
  }

  const submitAuth = async (event) => {
    event.preventDefault()
    setAuthBusy(true)
    setAuthMessage('')
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')
    if (!supabase) {
      setAuthMessage('Authentication is not configured yet. Add your Supabase URL and anon key to movie/.env.local.')
      setAuthBusy(false)
      return
    }
    const result = authMode === 'signup'
      ? await supabase.auth.signUp({ email, password, options: { data: { display_name: String(form.get('name') || '') } } })
      : await supabase.auth.signInWithPassword({ email, password })
    setAuthBusy(false)
    if (result.error) setAuthMessage(result.error.message)
    else if (authMode === 'signup' && !result.data.session) setAuthMessage('Account created! Check your email to confirm your account.')
    else { setAuthOpen(false); setAuthMessage('') }
  }

  const count = Object.keys(items).length
  const pageHeading = activePage === 'watchlist' ? 'Your watchlist' : activePage === 'favorites' ? 'Your favorites' : activePage === 'trending' ? 'Trending now' : ''
  const trendingMovies = collections.trending
  const recommendedMovies = movies.filter((movie) => !items[movieId(movie)]).slice(0, 8)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); setActivePage('home') }}>
          <span className="brand-mark"><Clapperboard size={20} strokeWidth={2.3} /></span>
          <span>reel<span className="brand-light">good</span><small>YOUR CINEMA, CURATED</small></span>
        </a>
        <div className="side-label">YOUR SPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-link ${activePage === id ? 'nav-active' : ''}`} onClick={() => { setActivePage(id); setSearchResults(null); setMobileMenu(false) }}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {id === 'watchlist' && count > 0 && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>
        <div className="side-label mood-label">SET THE MOOD</div>
        <div className="mood-list">
          {moods.map((mood) => (
            <button key={mood.label} className={`mood-chip ${selectedMood === mood.label ? 'mood-selected' : ''}`} onClick={() => toggleMood(mood)}>
              <span>{mood.icon}</span>{mood.label}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="side-note"><span className="note-sparkle"><Sparkles size={15} /></span><p><b>Your next favorite</b><br />is just a little exploring away.</p></div>
          <button className="profile-trigger" onClick={() => user ? setProfileMenu(!profileMenu) : setAuthOpen(true)}>
            <span className="avatar">{user ? (user.user_metadata?.display_name?.[0] || user.email?.[0] || 'M').toUpperCase() : <UserRound size={17} />}</span>
            <span className="profile-copy"><b>{user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Movie lover'}</b><small>{user ? 'Your account' : 'Sign in to sync'}</small></span>
            {user ? <ChevronDown size={15} /> : <LogIn size={15} />}
          </button>
          {profileMenu && user && <div className="profile-popover"><span>{user.email}</span><button onClick={signOut}>Sign out</button></div>}
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu-button icon-button" aria-label="Open navigation" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Discover</span><span className="crumb-dot">/</span><b>{activePage === 'home' ? 'For you' : titleCase(activePage)}</b></div>
          <form className="search-box" onSubmit={submitSearch}>
            <Search size={17} />
            <input aria-label="Search movies" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search films, people..." />
            {search && <button type="button" className="search-clear" aria-label="Clear search" onClick={() => { setSearch(''); setSearchResults(null) }}><X size={15} /></button>}
            <kbd>↵</kbd>
          </form>
          <button className="top-avatar" aria-label={user ? 'Open profile' : 'Sign in'} onClick={() => user ? setProfileMenu(!profileMenu) : setAuthOpen(true)}>
            {user ? (user.user_metadata?.display_name?.[0] || user.email?.[0] || 'M').toUpperCase() : <UserRound size={17} />}
          </button>
        </header>

        <div className="page-wrap">
          {error && <div className="notice" role="status"><Info size={17} /><span>{error}</span><button aria-label="Dismiss message" onClick={() => setError('')}><X size={16} /></button></div>}
          {activePage === 'home' && !searchResults && !hasFilters && (
            <>
              <section className="hero-card" style={{ '--hero-image': `url("${backdropUrl(featured)}")` }}>
                <div className="hero-content">
                  <div className="eyebrow"><span className="eyebrow-dot" /> THIS WEEK'S SPOTLIGHT</div>
                  <h1>{featured.title || 'A story worth staying in for.'}</h1>
                  <p className="hero-description">{featured.overview || seedMovies[0].overview}</p>
                  <div className="hero-meta"><span><Star size={15} fill="currentColor" /> {(featured.vote_average || 8.2).toFixed(1)}</span><i /><span>{featured.release_date?.slice(0, 4) || '2024'}</span><i /><span>{prettyRuntime(featured.runtime) || '2h 47m'}</span><span className="hero-tag">EDITOR'S PICK</span></div>
                  <div className="hero-actions">
                    <button className="button-primary" onClick={() => setSelectedMovie(featured)}><Play size={16} fill="currentColor" /> Explore film</button>
                    <button className="button-quiet" onClick={() => toggleWatchlist(featured)}>
                      <Bookmark size={16} /> {items[movieId(featured)] ? 'Remove from list' : 'Add to watchlist'}
                    </button>
                  </div>
                </div>
                <div className="hero-gradient" />
                <div className="hero-film-badge"><span>01</span><i /> 04</div>
                <button className="hero-arrow" aria-label="Surprise me with a movie" onClick={surpriseMe}><ArrowRight size={18} /></button>
              </section>
              <section className="mood-section">
                <div className="section-heading mood-heading"><div><span className="eyebrow small-eyebrow">PICK YOUR PLOT</span><h2>What are you in the mood for?</h2></div><button className="text-link" onClick={surpriseMe}><WandSparkles size={16} /> Surprise me</button></div>
                <div className="mood-cards">{moods.map((mood, index) => <button key={mood.label} onClick={() => toggleMood(mood)} className={`mood-card mood-card-${index} ${selectedMood === mood.label ? 'mood-card-active' : ''}`}><span className="mood-card-icon">{mood.icon}</span><span>{mood.label}</span><ArrowRight size={15} /></button>)}</div>
              </section>
              <section className="movie-section trending-section">
                <div className="section-heading"><div><span className="eyebrow small-eyebrow">THE CROWD HAS SPOKEN</span><h2>Trending this week</h2></div><button className="text-link" onClick={() => setActivePage('trending')}>See all <ArrowRight size={15} /></button></div>
                <div className="movie-row">{trendingMovies.slice(0, 8).map((movie, index) => <MovieCard key={movie.id} movie={movie} rank={index + 1} item={items[movieId(movie)]} onSelect={() => setSelectedMovie(movie)} onSave={() => toggleWatchlist(movie)} />)}</div>
              </section>
              {TMDB_KEY && <section className="movie-section">
                <div className="section-heading"><div><span className="eyebrow small-eyebrow">FRESH FROM THE BIG SCREEN</span><h2>Popular right now</h2></div><button className="text-link" onClick={() => setActivePage('trending')}>Explore all <ArrowRight size={15} /></button></div>
                <div className="movie-row">{collections.popular.slice(0, 8).map((movie, index) => <MovieCard key={movie.id} movie={movie} item={items[movieId(movie)]} index={index} onSelect={() => setSelectedMovie(movie)} onSave={() => toggleWatchlist(movie)} />)}</div>
              </section>}
              {TMDB_KEY && <section className="movie-section">
                <div className="section-heading"><div><span className="eyebrow small-eyebrow">THE ONES THAT STAY WITH YOU</span><h2>All-time favorites</h2></div><button className="text-link" onClick={() => setActivePage('trending')}>See what's loved <ArrowRight size={15} /></button></div>
                <div className="movie-row">{collections.topRated.slice(0, 8).map((movie, index) => <MovieCard key={movie.id} movie={movie} item={items[movieId(movie)]} index={index} onSelect={() => setSelectedMovie(movie)} onSave={() => toggleWatchlist(movie)} />)}</div>
              </section>}
              {TMDB_KEY && collections.upcoming.length > 0 && <section className="movie-section">
                <div className="section-heading"><div><span className="eyebrow small-eyebrow">COMING TO A SCREEN NEAR YOU</span><h2>Coming soon</h2></div><span className="text-link">Plan your next movie night <Sparkles size={14} /></span></div>
                <div className="movie-row">{collections.upcoming.slice(0, 8).map((movie, index) => <MovieCard key={movie.id} movie={movie} item={items[movieId(movie)]} index={index} onSelect={() => setSelectedMovie(movie)} onSave={() => toggleWatchlist(movie)} />)}</div>
              </section>}
              <section className="movie-section recommendations-section">
                <div className="section-heading"><div><span className="eyebrow small-eyebrow">A LITTLE SOMETHING FOR YOU</span><h2>Hidden gems & good things</h2></div><button className="icon-button carousel-arrow" aria-label="Find a surprise movie" onClick={surpriseMe}><ArrowRight size={17} /></button></div>
                <div className="movie-row">{recommendedMovies.slice(0, 8).map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} item={items[movieId(movie)]} onSelect={() => setSelectedMovie(movie)} onSave={() => toggleWatchlist(movie)} />)}</div>
              </section>
            </>
          )}
          {(activePage !== 'home' || searchResults || hasFilters) && (
            <section className="catalog-section">
              <div className="catalog-title"><div><span className="eyebrow small-eyebrow">{activePage === 'watchlist' ? 'SAVED FOR LATER' : activePage === 'favorites' ? 'YOUR ALL-TIME LOVES' : searchResults ? 'FIND YOUR NEXT FILM' : 'THE GOOD STUFF'}</span><h1>{searchResults ? `Results for “${search}”` : pageHeading || 'Explore movies'}</h1><p>{searchResults ? `${visibleMovies.length} films found` : activePage === 'watchlist' ? `${visibleMovies.length} films saved for your next movie night` : activePage === 'favorites' ? `${visibleMovies.length} favorites, all in one place` : 'Find something worth pressing play for.'}</p></div><button className="surprise-button" onClick={surpriseMe}><WandSparkles size={16} /> Surprise me</button></div>
              <div className="filters-bar">
                <span className="filter-caption"><ArrowDownWideNarrow size={15} /> FILTER BY</span>
                <select aria-label="Filter by genre" value={selectedGenre} onChange={(event) => setSelectedGenre(event.target.value)}><option value="">All genres</option>{genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}</select>
                <select aria-label="Filter by year" value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}><option value="">Any year</option>{Array.from({ length: 35 }, (_, index) => String(new Date().getFullYear() - index)).map((year) => <option key={year}>{year}</option>)}</select>
                <select aria-label="Filter by language" value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}><option value="">Any language</option><option value="en">English</option><option value="ko">Korean</option><option value="ja">Japanese</option><option value="fr">French</option><option value="es">Spanish</option><option value="hi">Hindi</option></select>
                <select aria-label="Filter by rating" value={minRating} onChange={(event) => setMinRating(event.target.value)}><option value="">Any rating</option><option value="9">9+ exceptional</option><option value="8">8+ great</option><option value="7">7+ good</option></select>
                {hasFilters && <button className="clear-filters" onClick={clearFilters}>Clear filters <X size={13} /></button>}
              </div>
              {loading ? <div className="loading-state"><span className="spinner" /> Finding the good stuff...</div> : visibleMovies.length ? <div className="movie-grid">{visibleMovies.map((movie) => <MovieCard key={movie.id} movie={movie} item={items[movieId(movie)]} onSelect={() => setSelectedMovie(movie)} onSave={() => toggleWatchlist(movie)} />)}</div> : <div className="empty-state"><span className="empty-icon"><Film size={25} /></span><h3>{activePage === 'watchlist' ? 'Your story starts here' : 'No films found just yet'}</h3><p>{activePage === 'watchlist' ? 'Save films that catch your eye and they’ll be waiting right here.' : activePage === 'favorites' ? 'Tap the heart on a film to keep your favorites close.' : 'Try another search, or loosen up those filters a little.'}</p><button className="button-primary" onClick={() => { setActivePage('home'); clearFilters(); setSearchResults(null) }}>Back to discovery <ArrowRight size={15} /></button></div>}
            </section>
          )}
          <footer className="footer"><span><Clapperboard size={14} /> reelgood</span><span>Made for the love of a good story.</span><span>{TMDB_KEY ? 'Movie data by TMDB' : 'Add a TMDB key for live movie data'}</span></footer>
        </div>
      </main>

      {selectedMovie && <MovieModal movie={selectedMovie} item={items[movieId(selectedMovie)]} onClose={() => setSelectedMovie(null)} onUpdate={(updates) => updateItem(selectedMovie, updates)} onRemove={() => removeItem(selectedMovie)} />}
      {authOpen && <div className="modal-scrim auth-scrim" onClick={(event) => { if (event.target === event.currentTarget) setAuthOpen(false) }}><section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title"><button className="modal-close" onClick={() => setAuthOpen(false)} aria-label="Close"><X size={19} /></button><span className="auth-icon"><Clapperboard size={21} /></span><span className="eyebrow small-eyebrow">YOUR PERSONAL CINEMA</span><h2 id="auth-title">{authMode === 'login' ? 'Welcome back.' : 'Find your people.'}</h2><p>{authMode === 'login' ? 'Sign in to pick up where movie night left off.' : 'Create an account and keep your movie world in sync.'}</p><form onSubmit={submitAuth}>{authMode === 'signup' && <label>Your name<input name="name" placeholder="How should we call you?" autoComplete="name" required /></label>}<label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label><label>Password<input name="password" type="password" minLength="6" placeholder="At least 6 characters" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} required /></label>{authMessage && <div className="auth-message" role="alert">{authMessage}</div>}<button className="button-primary auth-submit" disabled={authBusy}>{authBusy ? 'One moment...' : authMode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={16} /></button></form><div className="auth-switch">{authMode === 'login' ? 'New around here?' : 'Already have an account?'} <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthMessage('') }}>{authMode === 'login' ? 'Create an account' : 'Sign in'}</button></div></section></div>}
      {mobileMenu && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)} />}
    </div>
  )
}

function MovieCard({ movie, rank, index, item, onSelect, onSave }) {
  return (
    <article className={`movie-card ${rank ? 'ranked-card' : ''}`} onClick={onSelect} onKeyDown={(event) => { if (event.key === 'Enter') onSelect() }} role="button" tabIndex={0} aria-label={`View ${movie.title}`}>
      <div className="poster-wrap"><img src={posterUrl(movie)} alt={`${movie.title} poster`} loading={index > 2 ? 'lazy' : 'eager'} onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80' }} /><div className="poster-shade" /><div className="poster-rating"><Star size={12} fill="currentColor" /> {Number(movie.vote_average || 0).toFixed(1)}</div>{rank && <span className="rank-number">{String(rank).padStart(2, '0')}</span>}      <button className={`save-button ${item ? 'is-saved' : ''}`} aria-label={item ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`} onClick={(event) => { event.stopPropagation(); onSave() }}><Bookmark size={15} fill={item ? 'currentColor' : 'none'} /></button><div className="poster-hover"><span><Play size={14} fill="currentColor" /> View details</span></div></div>
      <div className="movie-info"><h3>{movie.title}</h3><div><span>{movie.release_date?.slice(0, 4) || 'Coming soon'}</span><i /> <span>{genres.find((genre) => genre.id === (movie.genre_ids || [])[0])?.name || 'Cinema'}</span></div></div>
    </article>
  )
}

function MovieModal({ movie, item, onClose, onUpdate, onRemove }) {
  const [details, setDetails] = useState(movie)
  const [trailer, setTrailer] = useState('')
  const [loadingDetails, setLoadingDetails] = useState(Boolean(TMDB_KEY))
  const [detailError, setDetailError] = useState('')
  useEffect(() => {
    if (!TMDB_KEY) return
    let cancelled = false
    const headers = { Authorization: `Bearer ${TMDB_KEY}` }
    async function loadDetails() {
      try {
        const [detailResponse, videoResponse, creditsResponse] = await Promise.all([
          fetch(`${TMDB}/movie/${movie.id}?language=en-US`, { headers }),
          fetch(`${TMDB}/movie/${movie.id}/videos?language=en-US`, { headers }),
          fetch(`${TMDB}/movie/${movie.id}/credits?language=en-US`, { headers }),
        ])
        if (!detailResponse.ok) throw new Error('Could not load full movie details.')
        const [detail, videoData, credits] = await Promise.all([detailResponse.json(), videoResponse.json(), creditsResponse.json()])
        if (cancelled) return
        setDetails({ ...detail, director: credits.crew?.find((person) => person.job === 'Director')?.name, cast: credits.cast?.slice(0, 5).map((person) => person.name) })
        const video = videoData.results?.find((entry) => entry.site === 'YouTube' && entry.type === 'Trailer') || videoData.results?.find((entry) => entry.site === 'YouTube')
        if (video) setTrailer(`https://www.youtube-nocookie.com/embed/${video.key}`)
      } catch (error) {
        if (!cancelled) setDetailError(error.message)
      } finally {
        if (!cancelled) setLoadingDetails(false)
      }
    }
    loadDetails()
    return () => { cancelled = true }
  }, [movie.id])
  useEffect(() => {
    const handleKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])
  const isSaved = Boolean(item)
  return (
    <div className="modal-scrim" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="movie-title">
      <div className="detail-backdrop" style={{ backgroundImage: `linear-gradient(0deg, #111118 0%, rgba(17,17,24,.7) 36%, rgba(17,17,24,.08) 100%), url("${backdropUrl(details)}")` }} />
      <button className="modal-close" onClick={onClose} aria-label="Close movie details"><X size={19} /></button>
      <div className="detail-main"><div className="detail-poster"><img src={posterUrl(details)} alt={`${details.title} poster`} /></div><div className="detail-copy"><span className="eyebrow small-eyebrow">THE STORY</span><h2 id="movie-title">{details.title}</h2><div className="detail-meta"><span className="detail-rating"><Star size={14} fill="currentColor" /> {Number(details.vote_average || 0).toFixed(1)}<small>/10</small></span><i /><span>{details.release_date?.slice(0, 4)}</span><i /><span>{prettyRuntime(details.runtime)}</span><i /><span>{titleCase(details.original_language)}</span></div><div className="genre-tags">{(details.genres || genres.filter((genre) => (details.genre_ids || []).includes(genre.id))).slice(0, 3).map((genre) => <span key={genre.id}>{genre.name}</span>)}</div><p className="detail-overview">{details.overview || 'A wonderful story waiting to be discovered.'}</p><div className="credits"><p><span>DIRECTOR</span>{details.director || (loadingDetails ? 'Loading...' : 'Details coming soon')}</p><p><span>STARRING</span>{details.cast?.join(' · ') || (loadingDetails ? 'Loading...' : 'Discover the cast')}</p></div><div className="detail-actions"><button className={`button-primary ${isSaved ? 'saved-primary' : ''}`} onClick={() => isSaved ? onRemove() : onUpdate({ watched: false, favorite: false, rating: 0 })}>{isSaved ? <Check size={16} /> : <Bookmark size={16} />}{isSaved ? 'Remove from list' : 'Add to watchlist'}</button><button className={`favorite-button ${item?.favorite ? 'favorite-active' : ''}`} aria-label={item?.favorite ? 'Remove from favorites' : 'Add to favorites'} onClick={() => onUpdate({ favorite: !item?.favorite, watched: Boolean(item?.watched), rating: item?.rating || 0 })}><Heart size={17} fill={item?.favorite ? 'currentColor' : 'none'} /></button><button className={`watched-button ${item?.watched ? 'watched-active' : ''}`} onClick={() => onUpdate({ watched: !item?.watched, favorite: Boolean(item?.favorite), rating: item?.rating || 0 })}>{item?.watched ? <Check size={15} /> : <Ticket size={15} />}{item?.watched ? 'Watched' : 'Mark watched'}</button></div><div className="rate-movie"><span>YOUR RATING</span><div>{[1, 2, 3, 4, 5].map((rating) => <button key={rating} aria-label={`Rate ${rating} out of 5`} className={rating <= (item?.rating || 0) ? 'star-selected' : ''} onClick={() => onUpdate({ rating, watched: Boolean(item?.watched), favorite: Boolean(item?.favorite) })}><Star size={17} fill={rating <= (item?.rating || 0) ? 'currentColor' : 'none'} /></button>)}{item?.rating > 0 && <small>{item.rating}/5</small>}</div></div></div></div>
      {detailError && <div className="detail-error">{detailError}</div>}
      {trailer && <div className="trailer-section"><h3><Play size={14} fill="currentColor" /> Official trailer</h3><iframe src={trailer} title={`${details.title} trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>}
      {!trailer && !loadingDetails && <div className="no-trailer"><Info size={14} />{detailError || 'No trailer available for this film.'}</div>}
    </section></div>
  )
}

export default App
