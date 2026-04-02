// Intro paragraph — displayed as liner notes between the hero and the crate
const INTRO_TEXT = "Well I'm not dead yet. Decent going, so far. \n\nI thought it might be fun to compile a list of tracks over the years, not the best tracks, not even my favourite tracks...but each one has a very strong memory attached to it. \n\nLike when you hear a song and it takes you back to a very particular moment in time. That's this playlist for me. Hover over each album, the b-side contains a precious memory. \n\nMusic is a wonderful thing, it brings back those memories like they are just happening, you relive them all so vividly once more. Mine are filled with people, for some reason I remember people with all my music. What's better than memories of people and music? Thank you all for being there, putting up with me, laughing, dancing, giving and loving. \n\nYou're all the best of times. ";

// Playlist order IS the timeline — don't reorder by release year
const TRACKS = [
  // ═══════════════════════════════════════
  // SIDE A — 1980–1989 — Vinyl
  // ═══════════════════════════════════════
  {
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    era: "80s",
    imageUrl: "img/covers/01-michael-jackson.jpg",
    spotifyUrl: "https://open.spotify.com/track/3S2R0EVwBSAVMd5UMgKTL0",
    message: "First album. "
  },
  {
    title: "Karma Chameleon",
    artist: "Culture Club",
    year: 1983,
    era: "80s",
    imageUrl: "img/covers/02-culture-club.jpg",
    spotifyUrl: "https://open.spotify.com/track/3XDeeP9wBZzGhIPZmLfEEx",
    message: "Blue light discos and dancing with a girl called Justine "
  },
  {
    title: "Hot In The City",
    artist: "Billy Idol",
    year: 1985,
    era: "80s",
    imageUrl: "img/covers/03-billy-idol.jpg",
    spotifyUrl: "https://open.spotify.com/track/5LeDMHIZ5YDZ2b1VOcYVcG",
    message: "First mix tape, running and recording this as it played over the radio"
  },
  {
    title: "Don't Stop Me Now",
    artist: "Queen",
    year: 1987,
    era: "80s",
    imageUrl: "img/covers/04-queen.jpg",
    spotifyUrl: "https://open.spotify.com/track/5T8EDUDqKcs6OSOwEsfqG7",
    message: "My cousin Rob sent me this from the UK, listened to it relentlessly. "
  },

  // ═══════════════════════════════════════
  // SIDE B — 1990–1999 — Cassette → Technics 1200s
  // ═══════════════════════════════════════
  {
    title: "You Could Be Mine",
    artist: "Guns N' Roses",
    year: 1991,
    era: "90s",
    imageUrl: "img/covers/05-guns-n-roses.jpg",
    spotifyUrl: "https://open.spotify.com/track/4lwmKh4fBX9nThdziEf5qA",
    message: "Kiwifruit picking - bought these CDs. Snuck into T2 underage with Stuart."
  },
  {
    title: "Beautiful Ones",
    artist: "Suede",
    year: 1994,
    era: "90s",
    imageUrl: "img/covers/05-suede.jpg",
    spotifyUrl: "https://open.spotify.com/track/5yWVfYEeQRPuFtytvkOgU1",
    message: "Driving with John Manktelow around Auckland. Real Groovy.  "
  },
  {
    title: "Jesus I Was Evil",
    artist: "Darcy Clay",
    year: 1997,
    era: "90s",
    imageUrl: "img/covers/05-darcy-clay.jpg",
    spotifyUrl: "https://open.spotify.com/track/1lHnn0rxxaW9l7WhEX6NqS",
    message: "New uni friends in Auckland and Max TV. R.I.P. Darcy. "
  },
  {
    title: "The Man Who Sold The World",
    artist: "Nirvana",
    year: 1994,
    era: "90s",
    imageUrl: "img/covers/06-nirvana.jpg",
    spotifyUrl: "https://open.spotify.com/track/15VRO9CQwMpbqUYA7e6Hwg",
    message: "Full send on grunge. "
  },
  {
    title: "Rusty Cage",
    artist: "Soundgarden",
    year: 1994,
    era: "90s",
    imageUrl: "img/covers/07-soundgarden.jpg",
    spotifyUrl: "https://open.spotify.com/track/6hqIXyo6GxydAnoI8XeIrV",
    message: "I saw these guys at Wellington town hall with Si Woodgyer, god we nearly died. One of the best ever concerts. Some sweat. "
  },
  {
    title: "Caught by the Fuzz",
    artist: "Supergrass",
    year: 1995,
    era: "90s",
    imageUrl: "img/covers/08-supergrass.jpg",
    spotifyUrl: "https://open.spotify.com/track/0iAcyO7WLhnC7WOTOpjGv1",
    message: "Glenn, Si and Jeff in our Grey Lynn flat. "
  },
  {
    title: "Holiday",
    artist: "Madonna",
    year: 1983,
    era: "90s",
    imageUrl: "img/covers/09-madonna.jpg",
    spotifyUrl: "https://open.spotify.com/track/3ibAzRj9JnowdoLkyllk3n",
    message: "Bartending with Cam, Simon, Greg, John, Andres, Neal - Djing and bartending. There was cheese."
  },
  {
    title: "Klubbhopping",
    artist: "Klubbheads",
    year: 1997,
    era: "90s",
    imageUrl: "img/covers/12-klubbheads.jpg",
    spotifyUrl: "https://open.spotify.com/track/41otsEyU99WZIJAEDt6SZx",
    message: "There was also this. It's fun seeing 100s of people dancing to something you drop. "
  },
  {
    title: "Dreams of You",
    artist: "Kevin Yost, Peter Funk",
    year: 1998,
    era: "90s",
    imageUrl: "img/covers/08-kevin-yost-peter-funk.jpg",
    spotifyUrl: "https://open.spotify.com/track/1Usf7fuHNG5NyDEWzDeGrn",
    message: "Started house DJing, played this non stop on a tour of NZ with Paul D and Cam"
  },
  {
    title: "Earthshaker",
    artist: "The Republic",
    year: 1999,
    era: "90s",
    imageUrl: "img/covers/09-the-republic.jpg",
    spotifyUrl: "https://open.spotify.com/track/6EGV7HamGzN9aZrwEaijhJ",
    message: "DJing on K Road. Played at a bar that burned down. A personal favourite. "
  },
  {
    title: "The Ghetto",
    artist: "Bob Sinclar",
    year: 1998,
    era: "90s",
    imageUrl: "img/covers/15-bob-sinclar.jpg",
    spotifyUrl: "https://open.spotify.com/track/4wHvbgqq5lrNJ9BatOqeYS",
    message: "Another personal favourite from my record box. "
  },

  // ═══════════════════════════════════════
  // TRACK 3 — 2000–2009 — MiniDisc → CD
  // ═══════════════════════════════════════
  {
    title: "Weak Become Heroes",
    artist: "The Streets",
    year: 2002,
    era: "00s",
    imageUrl: "img/covers/10-the-streets.jpg",
    spotifyUrl: "https://open.spotify.com/track/4H45wRMStWCWwCLQ8TEz1z",
    message: "Clubbing in London. Dizzy new heights blinded by the lights. These people are for life. "
  },
  {
    title: "Rose rouge",
    artist: "St Germain",
    year: 2001,
    era: "00s",
    imageUrl: "img/covers/11-st-germain.jpg",
    spotifyUrl: "https://open.spotify.com/track/1divptdjcWXvF1aflfTQnw",
    message: "Dave Moggs. Greece. That beach. Seared. "
  },
  {
    title: "Maybe Tomorrow",
    artist: "Goldenhorse",
    year: 2003,
    era: "00s",
    imageUrl: "img/covers/12-goldenhorse.jpg",
    spotifyUrl: "https://open.spotify.com/track/5M6qQIoA8hKFWjmXFsSNoD",
    message: "Back in NZ with Kerry at the Sawmill cafe. Best worst car ever. "
  },
  {
    title: "House Rocca",
    artist: "Knuckleheadz",
    year: 2001,
    era: "00s",
    imageUrl: "img/covers/13-knuckleheadz.jpg",
    spotifyUrl: "https://open.spotify.com/track/0CsTcPo3X49sdO1uRGhMCl",
    message: "Back in London once again - House party to end all house parties with Paul and Katie."
  },
  {
    title: "Oi Divchino",
    artist: "The Ukrainians",
    year: 1991,
    era: "00s",
    imageUrl: "img/covers/20-the-ukrainians.jpg",
    spotifyUrl: "https://open.spotify.com/track/6hbkohe4OVM1Ng7v81dDWq",
    message: "Gary Russon and Tony and Grant. WAM at DrKW."
  },
  {
    title: "Drop the Pressure",
    artist: "Mylo",
    year: 2004,
    era: "00s",
    imageUrl: "img/covers/15-mylo.jpg",
    spotifyUrl: "https://open.spotify.com/track/2VtxdAH96cGcj1QzjpbHjA",
    message: "Katie dancing like a loon to this. All the time. "
  },
  {
    title: "Float On",
    artist: "Modest Mouse",
    year: 2004,
    era: "00s",
    imageUrl: "img/covers/14-modest-mouse.jpg",
    spotifyUrl: "https://open.spotify.com/track/3b00LSFIRqnHvkoDEs5fkg",
    message: "Snowboarding season with Alex and Matt in Morzine. "
  },
  {
    title: "California",
    artist: "Phantom Planet",
    year: 2004,
    era: "00s",
    imageUrl: "img/covers/23-geek-music.jpg",
    spotifyUrl: "https://open.spotify.com/track/2LFMWAOFyVJypKBgOFfdok",
    message: "Flatting with Rico, Al and Sus - The OC and the Mighty Boosh. "
  },
  {
    title: "Somebody Told Me",
    artist: "The Killers",
    year: 2004,
    era: "00s",
    imageUrl: "img/covers/16-the-killers.jpg",
    spotifyUrl: "https://open.spotify.com/track/7HGTkn2aX7MNdKs7nV2xBt",
    message: "Dicky once left this message on Sam's phone, just him...singing the whole song. "
  },
  {
    title: "All I Want Is You",
    artist: "Barry Louis Polisar",
    year: 2007,
    era: "00s",
    imageUrl: "img/covers/17-barry-louis-polisar.jpg",
    spotifyUrl: "https://open.spotify.com/track/5sIBOrRLBI6ypREdEPj2wQ",
    message: "Great dance moves from Sam. "
  },
  {
    title: "Kids",
    artist: "MGMT",
    year: 2008,
    era: "00s",
    imageUrl: "img/covers/18-mgmt.jpg",
    spotifyUrl: "https://open.spotify.com/track/1jJci4qxiYcOHhQR247rEU",
    message: "Driving to Pembroke waaaay to fast in Fletch's Saab to get last orders"
  },
  {
    title: "Look At Where We Are",
    artist: "Hot Chip",
    year: 2012,
    era: "00s",
    imageUrl: "img/covers/23-hot-chip.jpg",
    spotifyUrl: "https://open.spotify.com/track/4awYwVxuFrwxWVgk9jvELR",
    message: "It was a dark year, Lewis was there. Thanks Lewis. "
  },

  // ═══════════════════════════════════════
  // NOW PLAYING — 2010–2019 — Streaming
  // ═══════════════════════════════════════
  {
    title: "Give Life Back to Music",
    artist: "Daft Punk",
    year: 2013,
    era: "2010s",
    imageUrl: "img/covers/19-daft-punk.jpg",
    spotifyUrl: "https://open.spotify.com/track/0dEIca2nhcxDUV8C5QkPYb",
    message: "If there is a perfect day this was it. Ski touring, Chamonix after the storm, back home for wine outside Le Praz listening to this album with Fletch and Chistophe Le Bon. "
  },
  {
    title: "Sail",
    artist: "AWOLNATION",
    year: 2011,
    era: "2010s",
    imageUrl: "img/covers/29-awolnation.jpg",
    spotifyUrl: "https://open.spotify.com/track/7hsLKGEnoiNShdIGL6ws1f",
    message: "Cham Fam. Ski Buddy days with Ellen, wild adventure with Seth. Flatting with Jane. Les Caves. "
  },
  {
    title: "The World Is Watching",
    artist: "Two Door Cinema Club, Valentina Pappalardo",
    year: 2012,
    era: "2010s",
    imageUrl: "img/covers/20-two-door-cinema-club.jpg",
    spotifyUrl: "https://open.spotify.com/track/3YGK9FF2cOBRXgT6juJ4l0",
    message: "Trail runs and Sarah. "
  },
  {
    title: "Best of Friends",
    artist: "Palma Violets",
    year: 2013,
    era: "2010s",
    imageUrl: "img/covers/28-palma-violets.jpg",
    spotifyUrl: "https://open.spotify.com/track/4qXouIODcT7oqFdrX6gNxz",
    message: "Glasto with Moggsy. Dance with me brother. "
  },
  {
    title: "Here Comes The Sun",
    artist: "The Beatles",
    year: 2015,
    era: "2010s",
    imageUrl: "img/covers/21-the-beatles.jpg",
    spotifyUrl: "https://open.spotify.com/track/6dGnYIeXmHdcikdzNNDMm2",
    message: "Bouldering with Sarah. Our Song. "
  },
  {
    title: "Figure It Out",
    artist: "Royal Blood",
    year: 2014,
    era: "2010s",
    imageUrl: "img/covers/30-royal-blood.jpg",
    spotifyUrl: "https://open.spotify.com/track/3MjrueDQKVr6xDDseZwhEd",
    message: "Stitched Crew.  Richard, Felix, Michael and Ian Harris - headphones on drumming like a madman building amazing things. "
  },
  {
    title: "Cream On Chrome",
    artist: "Ratatat",
    year: 2015,
    era: "2010s",
    imageUrl: "img/covers/29-ratatat.jpg",
    spotifyUrl: "https://open.spotify.com/track/3s25iX3minD5jORW4KpANZ",
    message: "Wild gig at the Brixton Academy with Richard. "
  },
  {
    title: "The Night",
    artist: "Frankie Valli & The Four Seasons",
    year: 1975,
    era: "2010s",
    imageUrl: "img/covers/34-frankie-valli.jpg",
    spotifyUrl: "https://open.spotify.com/track/31ijr2O0SsuzAPVDLnq3XV",
    message: "Discovering my Northern Soul."
  },
  {
    title: "Leave This Island",
    artist: "Maximo Park",
    year: 2014,
    era: "2010s",
    imageUrl: "img/covers/22-maximo-park.jpg",
    spotifyUrl: "https://open.spotify.com/track/2wStc2el7aHJdi9AejMJOC",
    message: "NZ road trip in the Coromandel.  "
  },

  // ═══════════════════════════════════════
  // THE B-SIDE — 2020–2026 — Vinyl Redux
  // ═══════════════════════════════════════
  {
    title: "I Feel Love",
    artist: "Donna Summer",
    year: 2024,
    era: "2020s",
    imageUrl: "img/covers/25-donna-summer.jpg",
    spotifyUrl: "https://open.spotify.com/track/1vCBk33l9HaWp5FOnhSGxk",
    message: "BOTH girls born to this song, from random playlists."
  },
  {
    title: "Neighborhood #3 (Power Out)",
    artist: "Arcade Fire",
    year: 2004,
    era: "2020s",
    imageUrl: "img/covers/29-arcade-fire.jpg",
    spotifyUrl: "https://open.spotify.com/track/0hWkwXsf7hzVXNyDI3Olr2",
    message: "Live with Sarah in a boxing ring in East London. Hella gig. "
  },
  {
    title: "Lucky Ones",
    artist: "Lana Del Rey",
    year: 2012,
    era: "2020s",
    imageUrl: "img/covers/23-lana-del-rey.jpg",
    spotifyUrl: "https://open.spotify.com/track/7IJBUdmGhekulOkhct3WGD",
    message: "Stranded in NZ in Covid with the fam on the beach. Maisy."
  },
  {
    title: "Pink Rabbits",
    artist: "The National",
    year: 2013,
    era: "2020s",
    imageUrl: "img/covers/24-the-national.jpg",
    spotifyUrl: "https://open.spotify.com/track/1oNDnnBojo1hkFATFEp1CM",
    message: "Mainlined this track in Covid, in Pauanui, wrote a LOT of code."
  },
  {
    title: "Everything She Ain't",
    artist: "Hailey Whitters",
    year: 2022,
    era: "2020s",
    imageUrl: "img/covers/33-hailey-whitters.jpg",
    spotifyUrl: "https://open.spotify.com/track/0ENB9P6WtUEKYjQ3dKnK23",
    message: "Shared love of country with Sam T. "
  },
  {
    title: "Baddy On The Floor",
    artist: "Jamie xx, Honey Dijon",
    year: 2024,
    era: "2020s",
    imageUrl: "img/covers/39-jamie-xx.jpg",
    spotifyUrl: "https://open.spotify.com/track/3CqaTHbiU2nBy3Ar9RnDHN",
    message: "Rad Dad TShirt from the Girls and this floor filler from Rose."
  },
  {
    title: "Hypnotized",
    artist: "Purple Disco Machine, Sophie and the Giants",
    year: 2020,
    era: "2020s",
    imageUrl: "img/covers/36-purple-disco-machine.jpg",
    spotifyUrl: "https://open.spotify.com/track/7HxWZggiHyGWT9ZSmWzcxu",
    message: "Full circle back to Bob Sinclair levels. Working with Klaas at Trade Me"
  }
];

const PLAYLIST_URL = "https://open.spotify.com/playlist/3Kk6r9hmwCe0J8lKW7zG14";

const ERAS = {
  "80s": {
    "name": "Side A",
    "years": "1980–1989",
    "tagline": "Vinyl",
    "color": "#ff2d95"
  },
  "90s": {
    "name": "Side B",
    "years": "1990–1999",
    "tagline": "Cassette → Technics 1200s",
    "color": "#b026ff"
  },
  "00s": {
    "name": "Track 3",
    "years": "2000–2009",
    "tagline": "MiniDisc → CD",
    "color": "#c77dff"
  },
  "2010s": {
    "name": "Now Playing",
    "years": "2010–2019",
    "tagline": "Streaming",
    "color": "#7b2ff7"
  },
  "2020s": {
    "name": "The B-Side",
    "years": "2020–2026",
    "tagline": "Vinyl Redux",
    "color": "#ff2d95"
  }
};
