let news = [];
let page = 1;
let total_pages = 0;

let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => menu.addEventListener("click", (event)=>getNewsByTopic(event)
 ));

let searchButton = document.getElementById("search-button");
let url;

const getNews = async () => {
    let header = new Headers({
        "x-api-key":"41bbc8996b2b4fa2b956ee81bae9e256",
});
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles
    total_pages = data.total_pages;
    page = data.page;
    render();
    pageNation;
};


const getLatestNews = async() => {
     url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=41bbc8996b2b4fa2b956ee81bae9e256`
        );
        getNews();
    };

const getNewsByTopic = async (event)=> {
    let topic = event.target.textContent.toLowerCase();
     url = new URL 
    (`https://newsapi.org/v2/top-headlines?country=us&apiKey=41bbc8996b2b4fa2b956ee81bae9e256&topic=${topic}`
    );
    getNews();
};

const getNewsByKeyword = async () => {
    let keyword = document.getElementById("search-input").value
     url = new URL (`https://newsapi.org/v2/everything?q=${keyword}`);
     getNews();
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };

const render = () => {
    let newsHTML = "";
    newsHTML = news.map((item) => {
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${item.urlToImage}"/>
        </div>
          <div class="col-lg-8">
        <h2>${item.title}</h2>
        <p>
           ${item.description}
        </p>
        <div>
            ${item.content}, ${item.publishedAt}
        </div>
          </div>
    </div>`
    }).join('');

    document.getElementById("news-board").innerHTML = newsHTML
};


const pageNation = () => {
    let pageNationHTML = "";
    let pageGroup = math.ceil(page/5)
    let last = pageGroup*5
    let first = last - 4
    for(let i=first; i<last;i++) {
        pageNationHTML +=`<li class="page-item"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }
    
    document.querySelectorAll("pageNation").innerHTML = pageNationHTML
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();
}

const errorRender = (message) => {
    let errorHTML = `<div>${message}</div>`
    document.getElementById("news-board").innerHTML = errorHTML
}

getLatestNews();
searchButton.addEventListener("click", getNewsByKeyword);

