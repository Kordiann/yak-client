const opacity_v0 = 'opacity_v0';
const opacity_v50 = 'opacity_v50';
const opacity_v75= 'opacity_v75';
const opacity_v1 = 'opacity_v1';

function elementAdd(element, opacity) {
    element.classList.add(opacity);
}

function elementRemove(element, opacity) {
    element.classList.remove(opacity);
}

export function showElement(e) {
    e.preventDefault();
    let id = e.currentTarget.id;

    const mainElement = document.getElementById(id);
    const subElement = document.getElementById('sub_' + id);

    elementAdd(mainElement, opacity_v75);
    elementRemove(mainElement, opacity_v1);

    elementAdd(subElement, opacity_v1);
    elementRemove(subElement, opacity_v0);
}

export function hideElement(e) {
    e.preventDefault();
    let id = e.currentTarget.id;

    const mainElement = document.getElementById(id);
    const subElement = document.getElementById('sub_' + id);

    elementAdd(mainElement, opacity_v1);
    elementRemove(mainElement, opacity_v75);

    elementAdd(subElement, opacity_v0);
    elementRemove(subElement, opacity_v1);
}

export function showTitle(e) {
    e.preventDefault();
    let parent = document.getElementById(e.currentTarget.id);

    elementAdd(parent.firstChild, opacity_v1);
    elementRemove(parent.firstChild, opacity_v50);
}

export function hideTitle(e) {
    e.preventDefault();
    let parent = document.getElementById(e.currentTarget.id);

    elementAdd(parent.firstChild, opacity_v50);
    elementRemove(parent.firstChild, opacity_v1);
}

export function iconOpacityOn(e) {
    e.preventDefault();
    let element = document.getElementById('git_Icon');

    elementAdd(element, opacity_v75);
    elementRemove(element, opacity_v1);
}

export function iconOpacityOff(e) {
    e.preventDefault();
    let element = document.getElementById('git_Icon');

    elementAdd(element, opacity_v1);
    elementRemove(element, opacity_v75);
}

