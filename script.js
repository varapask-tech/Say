
function transformText() {
  const lines = document.getElementById("inputText").value.trim().split("\n");
  const product = document.getElementById("productLine").value;
  const page = document.getElementById("pageLine").value;
  const today = new Date().toISOString().split("T")[0];
  let output = [];

  const id = lines[0]?.trim();
  const name = lines[1]?.trim();
  output.push("=" + id + "." + name);
  output.push("=" + product);

  const cod = lines.find(l => l.toLowerCase().includes("cod"))?.split(":")[1]?.trim() || "";
  output.push("=COD/" + cod);

  const addressLines = lines.slice(2).filter(l => !l.match(/^(cod|fb:|pg:|admin:)/i) && !/^0[689]\d{8}$/.test(l) && !/\d{5}/.test(l));
  let address = addressLines.join(" ").trim();

  const khwaeng = lines.find(l => l.includes("แขวง")) || "";
  const khet = lines.find(l => l.includes("เขต")) || "";
  const tambon = lines.find(l => l.includes("ต.")) || "";
  const amphur = lines.find(l => l.includes("อ.")) || "";
  const provinceLine = lines.find(l => l.includes("จ.") || l.includes("กรุงเทพ"));
  let province = provinceLine?.replace(/จ\.|\d{5}/g, "").trim() || "";
  if (province.includes("กรุงเทพ")) province = "กรุงเทพมหานคร";

  let zip = (provinceLine?.match(/\d{5}/) || [])[0] || "";
  const phone = lines.find(l => /^0[689]\d{8}$/.test(l)) || "";

  let fullAddress = address + " " + (khwaeng || tambon) + (khwaeng ? " ," : " ") + (khet || amphur);
  output.push("=" + fullAddress.trim());
  output.push("=" + province);
  output.push("=" + zip);
  output.push("=" + phone);

  const fb = lines.find(l => l.toLowerCase().startsWith("fb:"))?.split(":")[1]?.trim() || "";
  const admin = lines.find(l => l.toLowerCase().startsWith("admin:"))?.split(":")[1]?.trim() || "";
  output.push("=" + fb);
  output.push("=" + admin);
  output.push("=" + page);
  output.push("=" + today);

  document.getElementById("outputText").textContent = output.join("\n");
}

function resetForm() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").textContent = "";
  document.getElementById("productLine").selectedIndex = 0;
  document.getElementById("pageLine").selectedIndex = 0;
}

function copyText() {
  navigator.clipboard.writeText(document.getElementById("outputText").textContent).then(() => {
    alert("📋 คัดลอกเรียบร้อยแล้ว!");
  });
}
