async function login(event) {
  event.preventDefault();

  let email = event.target.elements["email"].value;
  let password = event.target.elements["password"].value;

  const url = "http://localhost:3000/api/auth/login";
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (response.ok) {
      console.log("Successful Login");
      window.location.replace("/");
    }
  } catch (error) {
    console.error("Something went wrong: " + error);
  }
}

document.querySelector(".login-form").addEventListener("submit", login);
