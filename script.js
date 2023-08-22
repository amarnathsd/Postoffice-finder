// get ip address on page load
let ip = "";
window.addEventListener("load", () => {
  fetch("https://www.cloudflare.com/cdn-cgi/trace")
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      ip = data.split("\n")[2].split("=")[1];
      console.log(ip);
      document.getElementById(
        "ip-address"
      ).textContent = `Your Current IP Address is ${ip}`;
    })
    .catch((err) => console.error("error fetching IP add", err));
});
//handele button click to get details

document.getElementById("get-details").addEventListener("click", () => {
  let ipdata;
  console.log(ip);
  fetch(`https://ipinfo.io/${ip}/geo?token=c0afecee74cc18`)
    .then((res) => res.json())
    .then((data) => {
      const laatlong = data.loc.split(",");
      ipdata = data;
      console.log(ipdata);
      const mappHTML = `<iframe src="https://maps.google.com/maps?q=${laatlong[0]}, ${laatlong[1]}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;
      document.getElementById("location").innerHTML = mappHTML;
      // get time of the user's location
      const timezone = data.timezone;
      const date = new Date(
        new Date().toLocaleString("en-US", { timeZone: timezone })
      );
      document.getElementById(
        "time"
      ).textContent = `Your local time: ${date.toLocaleString()}`;
      //get post office details
      const pincode = data.postal;
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => res.json())
        .then((postofficesdata) => {
          console.log(postofficesdata[0].PostOffice);
          const postOffices = postofficesdata[0].PostOffice;
          const postofficeList = document.getElementById("post-office-list");
          postOffices.forEach(postOffice=>{
            const card = document.createElement("div");
            card.classList="postal-card";
            card.innerHTML=`
            <p>Name:${postOffice.Name}</p>
            <p>BranchType:${postOffice.BranchType}</p>
            <p>DeliveryStatus:${postOffice.DeliveryStatus}</p>
            <p>District:${postOffice.District}</p>
            <p>Division:${postOffice.Division}</p>`;
            postofficeList.appendChild(card);
          })
        });
    });
});

// search and filter post office

document.getElementById('search-box').addEventListener('input',(e)=>{
  const searchQuery=e.target.value.toLowerCase();
  const postofficeListItems=document.getElementById('post-office-list').children;
  console.log(postofficeListItems);

  Array.from(postofficeListItems).forEach(item=>{
    const postOfficeName=item.children[0].spilt(": ");
    console.log(postOfficeName);
  })
})
