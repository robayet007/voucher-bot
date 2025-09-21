document.getElementById("paymentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
  };

  try {
    const res = await fetch("/api/savePayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert("Error saving payment: " + err.message);
  }
});
