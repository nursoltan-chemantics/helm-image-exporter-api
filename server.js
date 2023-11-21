const { createServer } = require("http");
const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.text());

let browser;
let page;

const initializeBrowser = async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(
    "http://srd.chemantics.com:9999/WebService/hwe/examples/App.htm"
  );
};

app.post("/api/helm", async (req, res) => {
  const text = req.body;

  console.log("input", text);

  try {
    if (!browser) {
      await initializeBrowser();
    }

    const title = await page.title();

    // Find and click on the "td" element with the specified text
    await page.$$eval(
      "td",
      (tds, searchText) => {
        const tdWithText = tds.find((td) => td.innerText === searchText);
        if (tdWithText) {
          tdWithText.click();
        }
      },
      "HELM"
    );

    // Find all div elements with contenteditable=true
    const divElements = await page.$$("div[contenteditable=true]");

    // Check if there is at least a second div element
    if (divElements.length >= 2) {
      // Get the second div element
      const secondDivElement = divElements[1];

      // Clear the content of the second div element
      await page.evaluate((element) => {
        element.innerHTML = "";
      }, secondDivElement);

      await secondDivElement.type(text);
    } else {
      console.log(
        "There are not enough div elements with contenteditable=true."
      );
    }
    const buttonText = "Apply";
    const buttonElements = await page.$$(`button[title="Apply HELM Notation"]`);
    if (buttonElements.length) {
      const secondButtonElement = buttonElements[0];
      await secondButtonElement.click();
    } else {
      console.log(
        `There are not enough button elements with text "${buttonText}".`
      );
    }
  } catch (error) {
    console.error("Error in Puppeteer:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }

  const svgElement = await page.$("svg");
  if (svgElement) {
    const svgOuterHTML = await page.evaluate((el) => el.outerHTML, svgElement);
    console.log("Found SVG element:", svgOuterHTML);

    if (svgOuterHTML) {
      res.status(200).send(svgOuterHTML);
    } else {
      res.send("");
    }
  } else {
    console.log("No SVG element found.");
    res.send("");
  }
});

const server = createServer(app);

const port = 3005;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
