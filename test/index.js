const puppeteer = require("puppeteer");
const fs = require("fs");
const maps = require("./maps");
const tests = require("./tests");

(async () => {
  var n = 12;
  fs.unlink("./output.txt", function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const pages = [];
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  // await page.goto("https://christestingcase3.meteorapp.com/");
  await page.waitForTimeout(200);
  pages.push(page);

  for (var i = 0; i < n - 1; i++) {
    await pages[i].bringToFront();

    let newTabTarget;
    const targetCreatedPromise = new Promise((resolve) => {
      browser.on("targetcreated", (target) => {
        newTabTarget = target;
        resolve();
      });
    });
    const buttons = await pages[i].$$(".bp3-button");
    await buttons[1].click();
    await targetCreatedPromise;
    await pages[i].waitForTimeout(700);
    const newTabPage = await newTabTarget.page();
    await newTabPage.bringToFront();
    pages.push(newTabPage);
  }

  for (var i = 0; i < n; i++) {
    await pages[i].bringToFront();
    const button_agree = await pages[i].$(".bp3-intent-success");
    await button_agree.click();
    await pages[i].type("input[name=id]", "Seif" + i.toString(), {
      delay: 1,
    });
    await pages[i].type("input[name=MTurk]", i.toString(), { delay: 1 });
    await pages[i].click('[name="submit-button"]');
    // await pages[i].waitForTimeout(10000);
    // instruction
    await pages[i].waitForSelector("#instructOneContainer", {
      timeout: 10000000,
    });
    await pages[i].click('[name="next-button"]');
    // await pages[i].waitForTimeout(10000);
    // quiz page
    await pages[i].waitForSelector("#quizContainer", {
      timeout: 10000000,
    });
    await pages[i].type("input[name=sum]", "4", { delay: 1 });
    await pages[i].click('[name="submit-button"]');
  }

  //   const test = [0,1,2,3,4,5,6,0,1,2,3,4]

  // 5 rounds
  for (var r = 0; r < 5; r++) {
    var test = tests[r];
    await pages[0].bringToFront();
    // if (r == 0) {
    //   await pages[0].waitForTimeout(3000);
    // }
    // else {
    await pages[0].waitForSelector("#scaleContainer", { timeout: 10000000 }); // Wait for the new stage element to appear
    //}

    // for loop for stage 1 automation
    // each round, n players so n times
    for (var i = 0; i < n; i++) {
      // if (i == 33 && r == 2) {
      //   break;
      // }
      // if (i ==23) {
      //   break;
      // }

      await pages[i].bringToFront();
      await pages[i].waitForSelector("#scaleContainer", { timeout: 10000000 }); // Wait for the new stage element to appear
      const reactions = await pages[i].$$(".rounded-full");
      await pages[i].waitForSelector("#responseContainer", {
        timeout: 10000000,
      }); // Wait for the new stage element to appear

      //console.log(reactions.length)
      // console.log(test[i]);
      // console.log(reactions);
      await reactions[test[i]].click();
      await pages[i].type("textarea[name=reason]", i.toString(), { delay: 1 });
      await pages[i].waitForTimeout(200);
      await pages[i].click('[name="submit-button"]');
    }

    // This is for varrying answers for each round testing statements

    // await pages[0].bringToFront();
    // await pages[0].waitForTimeout(1000);

    // // for loop for stage 2 automation
    // fs.appendFileSync("output.txt", "Round " + r.toString() + " Stage 2:\n");
    // for (var i = 0; i < n; i++) {
    //   var str_output = "";
    //   await pages[i].bringToFront();
    //   await pages[i].waitForTimeout(200);
    //   const reasons = await pages[i].$$eval(".reason-p", (elements) =>
    //     elements.map((element) => element.textContent)
    //   );
    //   const answers = await pages[i].$$eval(".rating-p", (elements) =>
    //     elements.map((element) => element.textContent)
    //   );
    //   const answers2 = answers.map((ans) => maps.get(ans));
    //   str_output +=
    //     i.toString() + " ans: " + test[i].toString() + "  Connections: ";
    //   for (var j = 0; j < reasons.length; j++) {
    //     str_output +=
    //       "(" +
    //       reasons[j].toString() +
    //       " ans: " +
    //       answers2[j].toString() +
    //       ")" +
    //       ", ";
    //   }
    //   str_output += "\n";
    //   fs.appendFileSync("output.txt", str_output);
    //   const reactions = await pages[i].$$(".rounded-full");
    //   //console.log(reactions.length)
    //   await reactions[reactions.length - 7 + test[i]].click();
    //   await pages[i].click('input[type="checkbox"]');
    //   await pages[i].waitForTimeout(300);
    //   await pages[i].click('[name="submit-button"]');
    // }

    // // for loop for stage 3 automation
    // await pages[0].bringToFront();
    // await pages[0].waitForTimeout(1000);
    // fs.appendFileSync("output.txt", "Round " + r.toString() + " Stage 3:\n");
    // for (var i = 0; i < n; i++) {
    //   var str_output = "";
    //   await pages[i].bringToFront();
    //   await pages[i].waitForTimeout(200);
    //   const reasons = await pages[i].$$eval(".reason-p", (elements) =>
    //     elements.map((element) => element.textContent)
    //   );
    //   const answers = await pages[i].$$eval(".rating-p", (elements) =>
    //     elements.map((element) => element.textContent)
    //   );
    //   const answers2 = answers.map((ans) => maps.get(ans));
    //   str_output +=
    //     i.toString() + " ans: " + test[i].toString() + "  Connections: ";
    //   for (var j = 0; j < reasons.length; j++) {
    //     str_output +=
    //       "(" +
    //       reasons[j].toString() +
    //       " ans: " +
    //       answers2[j].toString() +
    //       ")" +
    //       ", ";
    //   }
    //   str_output += "\n";
    //   fs.appendFileSync("output.txt", str_output);
    //   const likes = await pages[i].$$(".like-icon");
    //   //console.log(likes.length);
    //   for (var j = 0; j < likes.length; j++) {
    //     await likes[j].click();
    //   }
    //   await pages[i].waitForTimeout(300);
    //   await pages[i].click('[name="submit-button"]');
    // }
  } //end of rounds for loop

  // await browser.close()
})();
