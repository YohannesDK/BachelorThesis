<template>
  <div
    class="container d-flex justify-content-end p-1 align-items-center"
    style="margin-top:3%;"
  >
    <div class="navbar" style="margin: auto; margin-left:0;">
      <h1>My Documents</h1>
    </div>
    <div class="wrap">
      <input
        id="document-search"
        name="search"
        type="text"
        placeholder="Looking for a document..."
      />
      <div class="search-icon-wrapper">
        <fa icon="search" size="lg" />
      </div>
    </div>
  </div>
  <div class="container">
    <ul class="tilesWrap d-flex justify-content-evenly flex-wrap">
      <li>
        <h2>02</h2>
        <h3>Title 2</h3>
        <p>
          When an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries.
        </p>
        <button>Read more</button>
      </li>
      <li>
        <h2>02</h2>
        <h3>Title 2</h3>
        <p>
          When an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries.
        </p>
        <button>Read more</button>
      </li>
      <li>
        <h2>02</h2>
        <h3>Title 2</h3>
        <p>
          When an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries.
        </p>
        <button>Read more</button>
      </li>
      <li>
        <h2>02</h2>
        <h3>Title 2</h3>
        <p>
          When an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries.
        </p>
        <button>Read more</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tilesWrap {
  padding: 0;
  margin: 50px auto;
  list-style: none;
  text-align: center;
}
.tilesWrap li {
  display: inline-block;
  width: 20%;
  min-width: 200px;
  max-width: 230px;
  padding: 80px 20px 40px;
  position: relative;
  vertical-align: top;
  margin: 10px;
  font-family: "helvetica", san-serif;
  min-height: 25vh;
  background: #262a2b;
  border: 1px solid #252727;
  text-align: left;
}
.tilesWrap li h2 {
  font-size: 114px;
  margin: 0;
  position: absolute;
  opacity: 0.2;
  top: 50px;
  right: 10px;
  transition: all 0.3s ease-in-out;
}
.tilesWrap li h3 {
  font-size: 20px;
  color: #b7b7b7;
  margin-bottom: 5px;
}
.tilesWrap li p {
  font-size: 16px;
  line-height: 18px;
  color: #b7b7b7;
  margin-top: 5px;
}
.tilesWrap li button {
  background: transparent;
  border: 1px solid #b7b7b7;
  padding: 10px 20px;
  color: #b7b7b7;
  border-radius: 3px;
  position: relative;
  transition: all 0.3s ease-in-out;
  transform: translateY(-40px);
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}
.tilesWrap li button:before {
  content: "";
  position: absolute;
  height: 100%;
  width: 120%;
  background: #b7b7b7;
  top: 0;
  opacity: 0;
  left: -140px;
  border-radius: 0 20px 20px 0;
  z-index: -1;
  transition: all 0.3s ease-in-out;
}
.tilesWrap li:hover button {
  transform: translateY(5px);
  opacity: 1;
}
.tilesWrap li button:hover {
  color: #262a2b;
}
.tilesWrap li button:hover:before {
  left: 0;
  opacity: 1;
}
.tilesWrap li:hover h2 {
  top: 0px;
  opacity: 0.6;
}

.tilesWrap li:before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  background: #fff;
  transform: skew(2deg, 2deg);
}
.tilesWrap li:after {
  content: "";
  position: absolute;
  width: 40%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.02);
}
.tilesWrap li:nth-child(1):before {
  background: #c9ffbf;
  background: -webkit-linear-gradient(to right, #ffafbd, #c9ffbf);
  background: linear-gradient(to right, #ffafbd, #c9ffbf);
}
.tilesWrap li:nth-child(2):before {
  background: #f2709c;
  background: -webkit-linear-gradient(to right, #ff9472, #f2709c);
  background: linear-gradient(to right, #ff9472, #f2709c);
}
.tilesWrap li:nth-child(3):before {
  background: #c21500;
  background: -webkit-linear-gradient(to right, #ffc500, #c21500);
  background: linear-gradient(to right, #ffc500, #c21500);
}
.tilesWrap li:nth-child(4):before {
  background: #fc354c;
  background: -webkit-linear-gradient(to right, #0abfbc, #fc354c);
  background: linear-gradient(to right, #0abfbc, #fc354c);
}

.wrap {
  /* margin: 50px 100px; */
  display: inline-block;
  position: relative;
  height: 45px;
  float: right;
  padding: 0;
}

#document-search {
  height: 45px;
  font-size: 40px;
  display: inline-block;
  font-family: "Lato";
  font-weight: 100;
  border: none;
  outline: none;
  color: #555;
  padding: 3px;
  padding-right: 60px;
  width: 0px;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  z-index: 3;
  transition: width 0.4s cubic-bezier(0, 0.795, 0, 1);
  cursor: pointer;
}

#document-search:focus:hover {
  border-bottom: 1px solid #bbb;
}

#document-search:focus {
  width: 700px;
  z-index: 1;
  border-bottom: 1px solid #bbb;
  cursor: text;
}

.search-icon-wrapper {
  height: 100%;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c58308;
  color: white;
}
</style>
