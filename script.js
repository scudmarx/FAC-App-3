let movieData = {
    "The Darjeeling Limited": {
      plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
      cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
      runtime: 151,
      rating: 7.2,
      year: 2007,
    },
    "The Royal Tenenbaums": {
      plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
      rating: 7.6,
      year: 2001,
      cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
      runtime: 170,
    },
    "Fantastic Mr. Fox": {
      year: 2009,
      plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
      cast: [
        "George Clooney",
        "Meryl Streep",
        "Bill Murray",
        "Jason Schwartzman",
      ],
      runtime: 147,
      rating: 7.9,
    },
    "The Grand Budapest Hotel": {
      rating: 8.1,
      runtime: 159,
      year: 2014,
      plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
      cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    },
  };

const App = {
    target: null,
    onload: () => {
        App.target = document.getElementById("dataTarget")
        for (const name in movieData) {
            let movie = movieData[name]
            movie.name = name
            App.movieArr.push(movie)
        }
        App.render()
    },
    render: () => {
        let newScene = document.createElement("div")
        newScene.className = "container"
        let sortText = document.createElement("p")
        sortText.textContent = App.sortBy ? `Sorted by ${App.sortBy} ${App.sortDir == 1 ? "\u2191" : "\u2193"}` : ""
        sortText.className = "sortText sort"
        sortText.addEventListener("click", () => App.sort(App.sortBy))
        newScene.appendChild(sortText)
        for (const [i, movie] of App.movieArr.entries()) {
            newScene.appendChild(App.movieElem(movie, i))
        }
        App.target.replaceChildren(newScene)
    },
    movieElem: (info, index) => {
        let box = document.createElement("div")
        box.className = "film"

        let title = document.createElement("h2")
            title.textContent = info.name
            title.addEventListener("click", () => App.sort("name"))
            title.className = "title sort"
        let plot = document.createElement("p")
            plot.textContent = info.plot
            plot.className = "plot"
        let cast = document.createElement("p")
            cast.textContent = `Starring: ${info.cast.join(", ")}`
            cast.className = "cast"
        let year = document.createElement("p")
            year.textContent = `(${info.year})`
            year.addEventListener("click", () => App.sort("year"))
            year.className = "year sort"
        let rating = document.createElement("span")
            rating.textContent = `imdb: ${info.rating}`
            rating.addEventListener("click", () => App.sort("rating"))
            rating.className = "rating sort"
        let runtime = document.createElement("span")
            runtime.textContent = `${info.runtime} mins`
            runtime.addEventListener("click", () => App.sort("runtime"))
            runtime.className = "runtime sort"
        let remove = document.createElement("p")
            remove.textContent = "x"
            remove.addEventListener("click", () => App.removeMovie(index))
            remove.className = "remove clickable"
        
        box.appendChild(title)
        box.appendChild(year)
        box.appendChild(rating)
        box.appendChild(runtime)
        box.appendChild(remove)
        box.appendChild(plot)
        box.appendChild(cast)
        
        return box
    },
    movieArr: [],
    sortBy: null,
    sortDir: 1,
    sort: (key) => {
        if (key) {
            if (App.sortBy == key) {
                App.sortDir = - App.sortDir
            } else {
                App.sortBy = key
                App.sortDir = 1
            }
        }

        if (App.sortBy) {
            App.movieArr.sort((a,b) => a[App.sortBy] > b[App.sortBy] ? App.sortDir : -App.sortDir)
        }

        App.render()
    },
    addMovie: (data) => {
        let newMovie = {
            name: data.name.value,
            year: data.year.value,
            rating: data.rating.value,
            runtime: data.runtime.value,
            plot: data.plot.value,
            cast: [],
        }
        App.movieArr.push(newMovie)
        console.dir(App.movieArr)
        App.sort()
    },
    removeMovie: (index) => {
        App.movieArr.splice(index,1)
        App.render()
    }
}
