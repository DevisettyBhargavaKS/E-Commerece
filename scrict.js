//initial products
let intialProducts = [
  {
    id: 1,
    name: "Realme Band",
    description: "An realme band which is launched with latest features",
    price: 2000,
    image: "https://m.media-amazon.com/images/I/51J90I5VJtL._AC_UY350_.jpg",
  },
  {
    id: 2,
    name: "HP Laptop",
    description: "HP Laptops starting ₹28149 w/13th Gen Intel Core",
    price: 45000,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
  },
  {
    id: 3,
    name: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    image: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    name: "Shoes",
    description:
      "BATA  Mens Boss-Grip Uniform Dress Shoe.office Formal Shoes For Men",
    price: 1999,
    image:
      "https://media.istockphoto.com/id/172417586/photo/elegant-black-leather-shoes.jpg?s=612x612&w=0&k=20&c=c_tTljwbu2m0AGxwb27NxCgG0Y2Cv-C4v8q6V36RYbw=",
  },
  {
    id: 5,
    name: "MI Powerbank",
    description:
      "Buy Mi Power Bank Online. Choose from a slim and lightweight range of mi power banks",
    price: 1499,
    image:
      "https://cdnmedia.placewellretail.com/pub/media/catalog/product/cache/d2f155c8ae3423b25125c336aa39579e/u/n/untitled-3_293.webp",
  },

  {
    id: 6,
    name: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 50999,
    image: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 7,
    name: "Woodland Belt",
    description:
      "The waist belt from Woodland is made from premium quality leather that gives durability and comes in a solid pattern.",
    price: 899,
    image: "https://4.imimg.com/data4/BV/SW/ANDROID-44791203/product.jpeg",
  },

  {
    id: 8,
    name: "Havells ceiling Fan",
    description:
      "Motors and Blades. The motor is the essential component of a ceiling fan Style and Design. Although you want your fan to be highly functional, you also want it to look nice in the room",
    price: 4999,
    image:
      "https://m.media-amazon.com/images/I/71XDK6h2nKL._AC_UF350,350_QL80_.jpg",
  },
];
//intial users
let newuser = [
  { id: 1, name: "admin", email: "admin@gmail.com", password: "admin123" },
  {
    id: 2,
    name: "bhargav",
    email: "bhargav@gmail.com",
    password: "bhargav123",
  },
  { id: 3, name: "siva", email: "siva@gmail.com", password: "siva123" },
  { id: 4, name: "rohith", email: "rohith@gmail.com", password: "rohith123" },
];
//load
window.addEventListener("load", () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(intialProducts));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(newuser));
  }
  if (location.pathname === "/Aindex.html") {
    loadAdminHomePage();
  }
  // console.log(location.pathname);
  if (location.pathname === "/index.html") {
    loadHomePage();
  }
  if (location.pathname === "/Aindex.html") {
    addproduct();
  }
  if (location.pathname === "/cart.html") {
    loadCartProduct();
  }
  // if (location.pathname === "/pages/orders.html") {
  //   checkout();
  // }
  if (location.pathname === "/orders.html") {
    loadorder();
  }
  if (location.pathname === "/Aorders.html") {
    loadadminorder();
  }
});
//randomid
const getrandomnumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};
const getrandomId = (type = "users") => {
  let newid = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 1000; i++) {
    const randomId = getrandomnumber();
    const checkId = newid.find((obj) => obj.id === randomId);
    if (!checkId) {
      return randomId;
    }
  }
};

//sign in

const signinhandler = () => {
  const emailRef = document.getElementById("email");
  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("error");

  if (emailRef.value.length === 0) {
    errorRef.innerText = "email should not be empty";
    return;
  }
  if (!validateemail(emailRef.value)) {
    errorRef.innerText = "Invalid Email Address";
    return;
  }
  if (passwordRef.value.length === 0) {
    errorRef.innerText = "password should not be empty";
    return;
  }
  if (passwordRef.value.length < 5) {
    errorRef.innerText = "Password should be greater than 5 digits";
    return;
  }
  const users = JSON.parse(localStorage.getItem("users"));

  let existinguser = users.find(
    (user) =>
      user.email === emailRef.value && user.password === passwordRef.value
  );
  if (!existinguser) {
    errorRef.innerText = "invalid credentials";
    return;
  }

  sessionStorage.setItem("userid", existinguser.id);
  errorRef.innerText = "";
  location.replace("/index.html");
  if (
    emailRef.value === "admin@gmail.com" &&
    passwordRef.value === "admin123"
  ) {
    location.replace("/Aindex.html");
    return;
  }
};
//validating email in signin
const validateemail = (emailRef) => {
  let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(emailRef);
};

//signup
const signuphandler = () => {
  const regemailRef = document.getElementById("regemail");
  const regnameRef = document.getElementById("regname");
  const regpasswordRef = document.getElementById("regpassword");
  const confrimpasswordRef = document.getElementById("confrimpassword");
  const wrongRef = document.getElementById("wrong");

  if (regemailRef.value.length === 0) {
    wrongRef.innerText = "email should not be empty";
    return;
  }
  if (!validateregemail(regemailRef.value)) {
    wrongRef.innerText = "Invalid Email Address";
    return;
  }
  if (regnameRef.value.length === 0) {
    wrongRef.innerText = "name should not be empty";
    return;
  }
  if (regpasswordRef.value.length === 0) {
    wrongRef.innerText = "password should not be empty";
    return;
  }
  if (confrimpasswordRef.value.length === 0) {
    wrongRef.innerText = "confrim password should not be empty";
    return;
  }
  if (regpasswordRef.value.length < 5) {
    wrongRef.innerText = "Password should be greater than 5 digits";
    return;
  }
  if (confrimpasswordRef.value.length < 5) {
    wrongRef.innerText = "Password should be greater than 5 digits";
    return;
  }
  if (regpasswordRef.value === confrimpasswordRef.value) {
    let User = JSON.parse(localStorage.getItem("users"));

    User.push({
      Id: getrandomId(),
      email: regemailRef.value,
      password: regpasswordRef.value,
    });
    localStorage.setItem("users", JSON.stringify(User));
    location.href = "/signin.html";
  } else {
    wrongRef.innerText = "Password Mismatch!!!";
  }
};

//validating email in signup

const validateregemail = (regemailRef) => {
  let regexmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regexmail.test(regemailRef);
};

// loading products in admin page
const loadAdminHomePage = () => {
  const itemstable = document.getElementById("tablebody");
  const products = JSON.parse(localStorage.getItem("products"));

  let productbody = "";
  for (let item of products) {
    productbody += `<tr>
    <td><img src="${item.image}" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td> ₹ ${item.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-primary me-2" onClick="editProductHandler(${item.id})">Edit</button>
      <button class="btn btn-danger" onClick="deleteProductHandler(${item.id})">Delete</button>
    </td>
  </tr>`;
  }

  itemstable.innerHTML = productbody;
};


//loading products in home page
const loadHomePage = () => {
  const productstable = document.getElementById("productsRow");
  const items = JSON.parse(localStorage.getItem("intialProducts"));

  let tablebody = "";
  for (let item of intialProducts) {
    tablebody += `<div class="col-3 mt-4">
    <div
      class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column"
    >
      <img src="${item.image}" alt="image" style="min-width:200px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${item.name}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${item.price}</p>
      <button class="btn btn-success" onClick="addToCart(${item.id})">Add to Cart</button>
    </div>
  </div>`;
  }

  productstable.innerHTML = tablebody;
};

//delete product
const deleteProductHandler = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const newproduct = products.filter((item) => item.id !== id);
  localStorage.setItem("products", JSON.stringify(newproduct));
  loadAdminHomePage();
};
//add products
const addproduct = () => {
  const nameRef = document.getElementById("name");
  const idRef = document.getElementById("id");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("description");
  const imageRef = document.getElementById("image");

  let products = JSON.parse(localStorage.getItem("products"));

  let id = idRef.value;
  if (id) {
    const product = products.find((product) => product.id === parseInt(id));

    products = products.filter((product) => product.id !== parseInt(id));
    products.push({
      ...product,
      name: nameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      image: imageRef.value,
    });
  } else {
    products.push({
      id: getrandomId("products"),
      name: nameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      image: imageRef.value,
    });
  }
  localStorage.setItem("products", JSON.stringify(products));
  location.href = "/Aindex.html";
};
// Add to cart
const addToCart = (id) => {
  let addTocart = JSON.parse(localStorage.getItem("products"));
  const product = addTocart.find((product) => product.id === parseInt(id));
  if (!sessionStorage.getItem("userid")) {
    location.href = "/index.html";
  } else {
    let userid = parseInt(sessionStorage.getItem("userid"));
    let cart = [];
    // console.log(cart.length);
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const cartProduct = cart.find(
      (c) => c.userid === parseInt(userid) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((product) => {
        if (
          product.id === parseInt(id) &&
          product.userid === parseInt(userid)
        ) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
    } else {
      cart.push({ userid: parseInt(userid), count: 1, ...product });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// loading cart
const loadCartProduct = () => {
  const cartTableRef = document.getElementById("tablecart");
  const totalRef = document.getElementById("total");
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (sessionStorage.getItem("userid")) {
      const userId = parseInt(sessionStorage.getItem("userid"));
      const userCart = cart.filter((c) => c.userid === userId);
      let body = "";
      let total = 0;
      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
            <td>${cartItem.name}</td>
            <td>${cartItem.count}</td>
            <td>${cartItem.price}</td>
            <td>₹ ${cartItem.price * cartItem.count}</td>
          </tr>`;
      }
      cartTableRef.innerHTML = body;
      totalRef.innerText = `Total - ${total}`;
    } else {
      location.href = "/signin.html";
    }
  }
};

//checkout

const checkout = () => {
  if (sessionStorage.getItem("userid")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userid = parseInt(sessionStorage.getItem("userid"));
      const userCart = cart.filter((usercart) => usercart.userid === userid);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        orderid: getrandomnumber(),
        userid: userid,
        status: "pending",
        products: userCart,
      });

      const otherCart = cart.filter(
        (otherusercart) => otherusercart.userid !== userid
      );
      localStorage.setItem("cart", JSON.stringify(otherCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      location.href = "/orders.html";
    }
  }
};

//orders for user page
const loadorder = () => {
  const orderref = document.getElementById("table");
  const orders = JSON.parse(localStorage.getItem("orders"));
  const userid = parseInt(sessionStorage.getItem("userid"));
  const userOrder = orders.filter((users) => users.userid === userid);

  let body = "";
  for (let order of userOrder) {
    let produ = "";
    let totalcount = 0;
    for (let prod of order.products) {
      produ += `<p>${prod.count} * ${prod.name}</p>`;
      totalcount += prod.count * prod.price;
      body += `<tr>
        <td>${order.orderid}</td>
        <td>${prod.name}</td>
        <td>${produ}</td>
        <td> ${order.status}</td>
        </tr>`;
    }
  }

  orderref.innerHTML = body;

  
};

//load admin order page

const loadadminorder = () => {
  const orderRef = document.getElementById("admintable");
  const orders = JSON.parse(localStorage.getItem("orders"));
  const users = JSON.parse(localStorage.getItem("users"));

  let body = "";
  for (let order of orders) {
    let product = "";
    let total = 0;
    let userid = "";
    for (let prod of order.products) {
      product += `<p>${prod.count} * ${prod.name}</p>`;
      total += prod.count * prod.price;
      userid += prod.userid;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const orderedUser = users.find(
      (user) => user.id === parseInt(order.userid)
    );
    body += `<tr>
          <td>${order.orderid}</td>
          <td>${orderedUser.email}</td>
          <td>${product}</td>
          <td>₹ ${total}</td>
          <td>
        <select id="pending-${order.orderid}">
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </td>
  </tr>`;
  }
  orderRef.innerHTML = body;

  for (let order of orders) {
    const statusRef = document.getElementById(`pending-${order.orderid}`);
    console.log(statusRef);
    //statusRef.value = order.status;
    statusRef.addEventListener("change", () => {
      const lastUpdatedOrders = JSON.parse(localStorage.getItem("orders"));
      const updatedOrders = lastUpdatedOrders.map((o) => {
        if (o.orderid === parseInt(order.orderid)) {
          return { ...o, status: statusRef.value };
        } else return o;
      });
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    });
  }
};
