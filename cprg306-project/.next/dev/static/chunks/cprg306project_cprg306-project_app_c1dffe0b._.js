(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cprg306project/cprg306-project/app/api/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllSpells",
    ()=>getAllSpells
]);
const BASE_URL = "https://www.dnd5eapi.co";
async function getAllSpells() {
    const spellIndexes = await fetch(BASE_URL + "/api/2014/spells").then((response)=>response.json());
    alert(spellIndexes.results.map((index)=>fetch(BASE_URL + index.url).then((response)=>response.json())));
    return Promise.all(spellIndexes.results.map((index)=>fetch(BASE_URL + index.url).then((response)=>response.json())));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cprg306project/cprg306-project/app/spells/spellCard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpellCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SpellCard({ spell }) {
    const TitleClass = "text-center p-4 ";
    const FillClass = "flex flex-col gap-4 text-s";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "bg-slate-700 rounded-2xl list-none w-5x1 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-red-500 mb-4",
                        children: spell.name
                    }, void 0, false, {
                        fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                        lineNumber: 9,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "italic text-sm text-amber-400",
                        children: [
                            spell.level > 0 && `Level ${spell.level} `,
                            spell.school.name,
                            spell.level === 0 && " cantrip"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                        lineNumber: 10,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                lineNumber: 8,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 text-sm rounded-lg bg-gray-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: TitleClass,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: FillClass,
                                children: "Casting Time"
                            }, void 0, false, {
                                fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                                lineNumber: 18,
                                columnNumber: 17
                            }, this),
                            spell.casting_time
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                        lineNumber: 17,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: TitleClass,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: FillClass,
                                children: "Range"
                            }, void 0, false, {
                                fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                                lineNumber: 22,
                                columnNumber: 17
                            }, this),
                            spell.range
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                        lineNumber: 21,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: TitleClass,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: FillClass,
                                children: "Components"
                            }, void 0, false, {
                                fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                                lineNumber: 26,
                                columnNumber: 17
                            }, this),
                            spell.components.join(", ")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                        lineNumber: 25,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: TitleClass,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: FillClass,
                                children: "Duration"
                            }, void 0, false, {
                                fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                                lineNumber: 30,
                                columnNumber: 17
                            }, this),
                            spell.duration
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cprg306project/cprg306-project/app/spells/spellCard.js",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
_c = SpellCard;
var _c;
__turbopack_context__.k.register(_c, "SpellCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cprg306project/cprg306-project/app/spells/spell.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Spell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$app$2f$api$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/app/api/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$app$2f$spells$2f$spellCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/app/spells/spellCard.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Spell() {
    _s();
    const [spells, setSpells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Spell.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$app$2f$api$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllSpells"])().then(setSpells);
        }
    }["Spell.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-serif text-center",
        children: [
            spells.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-amber-400",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/cprg306project/cprg306-project/app/spells/spell.js",
                lineNumber: 16,
                columnNumber: 37
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex flex-wrap justify-center gap-16",
                children: spells.map((spell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$app$2f$spells$2f$spellCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        spell: spell
                    }, spell.index, false, {
                        fileName: "[project]/cprg306project/cprg306-project/app/spells/spell.js",
                        lineNumber: 19,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cprg306project/cprg306-project/app/spells/spell.js",
                lineNumber: 17,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cprg306project/cprg306-project/app/spells/spell.js",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_s(Spell, "xGHngpvpaBS1GugJ71MDhp/cFpY=");
_c = Spell;
var _c;
__turbopack_context__.k.register(_c, "Spell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cprg306project/cprg306-project/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$app$2f$spells$2f$spell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cprg306project/cprg306-project/app/spells/spell.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Home() {
    _s();
    const [menu, setMenuBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("home");
    function menuDisplay() {
        if (menu === "spell") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mb-4",
                        children: "Spell Page"
                    }, void 0, false, {
                        fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$app$2f$spells$2f$spell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                lineNumber: 14,
                columnNumber: 9
            }, this);
        } else if (menu === "charSheet") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Character Sheet Page"
            }, void 0, false, {
                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                lineNumber: 21,
                columnNumber: 14
            }, this);
        } else if (menu === "monster") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Monster Page"
            }, void 0, false, {
                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                lineNumber: 24,
                columnNumber: 14
            }, this);
        } else {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Home"
            }, void 0, false, {
                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                lineNumber: 27,
                columnNumber: 14
            }, this);
        }
    }
    function handleMenuChange(event) {
        setMenuBy(event.target.value);
    }
    const optionClass = "text-left text-sm";
    const changeToHome = (e)=>{
        const $select = document.querySelector('#menu-select');
        $select.value = 'home';
        handleMenuChange({
            target: $select
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 pt-4 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex pl-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-serif text-sm",
                            children: "Welcome to my CPRG306-Project"
                        }, void 0, false, {
                            fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            id: "menu-select",
                            value: menu,
                            onChange: handleMenuChange,
                            className: "bg-red-700 hover:bg-red-600 text-white font-bold p-2 px-4 rounded w-35 h-15 mt-8 ml-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "home",
                                    className: optionClass,
                                    children: "Home"
                                }, void 0, false, {
                                    fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "charSheet",
                                    className: optionClass,
                                    children: "Character Sheets"
                                }, void 0, false, {
                                    fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "monster",
                                    className: optionClass,
                                    children: "Monsters"
                                }, void 0, false, {
                                    fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "spell",
                                    className: optionClass,
                                    children: "Spells"
                                }, void 0, false, {
                                    fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 items-center flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-serif text-6xl font-bold text-emerald-600 p-3",
                                onClick: changeToHome,
                                children: "Questlet"
                            }, void 0, false, {
                                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif text-s font-bold text-gray-300 ml-2",
                                children: "Your guide through Dungeons and Dragons"
                            }, void 0, false, {
                                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cprg306project$2f$cprg306$2d$project$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-screen min-h-240 flex-col items-center",
                children: menuDisplay()
            }, void 0, false, {
                fileName: "[project]/cprg306project/cprg306-project/app/page.js",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cprg306project/cprg306-project/app/page.js",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(Home, "USkLvllaVFu8u70AYWzo9wVN0VE=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=cprg306project_cprg306-project_app_c1dffe0b._.js.map