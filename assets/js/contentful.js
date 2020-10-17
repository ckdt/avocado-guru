/* /spaces/{space_id}/environments/{environment_id}/entries?access_token={access_token}*/

const baseUrl = "https://cdn.contentful.com";
const spaceId = "nekw3i54g2gk";
const environmentId = "master";
const accessToken = "Fva_lIuly40XoBwmJ7U82Z36-YVvHKPN1g2NqtoPoU4";

const url =`${baseUrl}/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`;

const sectionTag = document.querySelector('.cards');

const grabData = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // store assets
      const assets = data.includes.Asset;
      // turn contentful data into useful data
      return data.items.map(item =>{
        let avatarUrl = "fallback.jpg";
        const avatarId = item.fields.avatar.sys.id;
        const avatarData = assets.find(asset=>{
          return asset.sys.id == avatarId;
        });

        if(avatarData){
          avatarUrl = avatarData.fields.file.url;
        }

        item.fields.avatar = avatarUrl;
        
      console.log(avatarUrl);
       

        return item.fields;
      });
    });
}

grabData().then(data => {
  // do something with return data;
  console.log(data);

  // remove loader
  sectionTag.innerHTML = "";

  data.forEach(item = function(item, index){
    sectionTag.innerHTML = sectionTag.innerHTML + `
    <article class="card">
    <header class="card--header">
      <p class="card--header--number">&#35; ${index+1}</p>
    </header>
    <div class="card--content">
      <p class="content--routine">
      ${item.routine}
       </p>
    </div>
    <footer class="card--footer">
      <div class="footer--avatar">
        <img
          src="${item.avatar}"
          class="footer--avatar--img"
        />
      </div>
      <div class="footer--info">
        <div class="footer--author">
          <p class="footer--name">${item.name}</p>
          <p class="footer--company">
            <a href="${item.url}" target="_blank" rel="noopener"
              >${item.company}</a
            >
          </p>
        </div>
        <div class="footer--handle"><a href="https://twitter.com/${item.handle}" target="_blank" rel="noopener">${item.handle}</a></div>
      </div>
    </footer>
  </article>
    `;
  });
});
