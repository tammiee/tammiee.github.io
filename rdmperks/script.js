const slots = document.getElementsByClassName("slot")

var killer_perks;
var survivor_perks;
var is_survivor_perks = false;

fetch('perks.json')
    .then(response => response.json())
    .then(data => {
        killer_perks = data.killer
        survivor_perks = data.survivor
        generate()
    })

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generate_perk(title, img) {
    return `<img src="icons/${img}">
            <h2>${title}</h3>`
}

function getRandomPerk(chosen_perks) {
    if (is_survivor_perks) {
        let perk = survivor_perks[getRandomInt(survivor_perks.length)]
        while (chosen_perks.includes(perk))
            perk = survivor_perks[getRandomInt(survivor_perks.length)]
        return perk
    } else {
        let perk = killer_perks[getRandomInt(killer_perks.length)]
        while (chosen_perks.includes(perk))
            perk = killer_perks[getRandomInt(killer_perks.length)]
        return perk
    }
}
document.getElementById("switch").addEventListener("click", switcher)
document.getElementById("generate").addEventListener("click", generate)
function generate() {
    for (let i = 0; i < slots.length; i++)
        slots[i].innerHTML = "";
    let chosen_perks = [];
    for (let i = 0; i < slots.length; i++) {
        let perk = getRandomPerk(chosen_perks)
        chosen_perks.push(perk)
        slots[i].innerHTML = generate_perk(perk.title, perk.img)
    }
}

function switcher(ev) {
    is_survivor_perks = ev.srcElement.checked;
    let text = document.getElementById("selection");
    if (is_survivor_perks) {
        text.innerHTML = "Survivor"
    } else {
        text.innerHTML = "Killer"
    }
    generate()
}