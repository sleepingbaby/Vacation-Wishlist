async function signup(event) {
  event.preventDefault();

  const url = "http://localhost:3000/api/auth/signup";

  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;

  try {
    const userData = { email, password };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      window.location.replace("/login");
    } else {
      console.error("Signup Failed");
    }
  } catch (err) {
    console.error({ message: err });
  }
}

document.querySelector(".signup-form").addEventListener("submit", signup);
