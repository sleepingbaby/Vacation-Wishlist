async function addDestination(event) {
  event.preventDefault();

  const url = "http://localhost:3000/api/destinations/addDestination";

  const name = event.target.elements["name"].value;
  const location = event.target.elements["location"].value;
  const description = event.target.elements["description"].value;

  const destination = { name, location, description };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(destination),
    });

    if (response.ok) {
      document.querySelector("#destinationForm").reset();
      location.reload();
    } else {
      console.error("Failed to Add Destination");
    }
  } catch (err) {
    console.error({ message: err });
  }
}

async function logout() {
  const url = "http://localhost:3000/api/auth/logout";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    window.location.replace("/");
  }
}

document
  .querySelector("#destinationForm")
  .addEventListener("submit", addDestination);

document
  .querySelector(".logout-button")
  .addEventListener("click", () => logout());
