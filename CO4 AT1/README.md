# Web Technology &bull; Unit IV: CO4 AT1
## Course Enrollment Intelligence & XML Analytics Engine

### 🎯 Aim
To model university course enrollment data using structured **XML**, retrieve precise multi-criteria information using **XPath**, transform and sort the data into an accessible HTML presentation using **XSLT**, and interpret quantitative findings to generate strategic academic insights.

---

### 🌟 Innovative Features & Interactive Capabilities
This upgraded single-page application transforms a standard academic assignment into an interactive data intelligence platform:

1. **Cyber-Editorial & Glassmorphic UI**: High-contrast luminous accents, modern typography (*Plus Jakarta Sans*, *Space Grotesk*, *JetBrains Mono*), smooth micro-interactions, and a persistent **Dark/Light Theme Switcher** with local storage memory.
2. **Interactive XML DOM Tree Inspector**: Collapsible interactive tree nodes that allow inspecting element hierarchies, attributes, and values directly in the browser alongside raw XML code.
3. **Live XPath Query Sandbox**:
   - Executes all 10 mandatory academic queries (**Q2(a)** through **Q2(j)**) in real-time with one-click triggers.
   - Built-in live custom XPath query input with milliseconds execution timer and one-click preset buttons (`sum()`, `count()`, `@id` lookups, etc.).
   - Category filtering (Basic selection, Predicates, Positional).
4. **Interactive XSLT Laboratory**:
   - Dynamic threshold slider (`students > [threshold]`, default 40) that updates the XSLT output dynamically.
   - Dual code viewers for input XML (`courses.xml`) and stylesheet rules (`courses.xsl`).
   - View mode switcher between Rendered Glassmorphic HTML Table and Raw Generated HTML markup.
5. **Dynamic Data Interpretation & Visual SVG Charts**:
   - Automatic deduction of Highest/Lowest enrollments, Theory/Practical ratios, and Teaching Assistant (TA) capacity flags (> 60 students).
   - Interactive SVG/CSS bar chart visualizer with enrollment benchmark color highlights.
6. **Live Course Data Simulator Drawer**:
   - Interactive sliders to dynamically alter course student numbers and observe real-time recalculations across XML DOM, XPath, XSLT, and Analytics!
   - Single-click restore button to revert to standard academic ground truth.
7. **Interactive Knowledge Assessment Quiz**:
   - 4 multiple-choice questions testing XML structure, XPath predicates, XSLT sort parameters, and pedagogical interpretation with instant score tracking.
8. **Master Dataset Explorer**:
   - Multi-column live search, dropdown filtering (Course Type, Credits), sortable table columns, and instant **CSV / JSON export**.

---

### 📂 Project Architecture
```
CO4 AT1/
├── index.html       # Accessible modern dashboard shell & interactive modules
├── style.css        # Glassmorphic cyber design tokens, responsive grid & animations
├── script.js        # Dynamic XML parsing, XPath sandbox, XSLT engine & simulators
├── courses.xml      # Standard 5-course dataset
├── courses.xsl      # XSLT stylesheet (students > 40, descending numerical sort)
└── README.md        # Comprehensive technical documentation & algorithms
```

---

### 📋 Academic Assessment Breakdown

#### **Question 1: XML Structural Interpretation (5 Marks)**
- **Root Element**: `<courses>` — enclosing the complete university dataset.
- **Repeating Element**: `<course>` — repeating entity representing individual courses.
- **Unique Identifier**: `id` attribute (e.g. `id="C101"`, `id="C102"`).
- **Numeric Elements**: `<students>` (class enrollment count) and `<credits>` (academic credit weight).
- **Well-Formedness Verification**: Strict compliance with W3C XML 1.0 specifications (single root, matching tag pairs, case sensitivity, quoted attribute strings, and valid XML declaration).

#### **Question 2: XPath Data Selection (10 Marks)**
| Code | Description | XPath Expression |
| :--- | :--- | :--- |
| **Q2(a)** | All course records | `/courses/course` |
| **Q2(b)** | Names of all courses | `/courses/course/name` |
| **Q2(c)** | Courses with > 50 students | `/courses/course[students > 50]` |
| **Q2(d)** | Courses carrying 4 credits | `/courses/course[credits = 4]` |
| **Q2(e)** | Courses whose type is Theory | `/courses/course[type = 'Theory']` |
| **Q2(f)** | Names of Theory courses with > 50 students | `/courses/course[type = 'Theory' and students > 50]/name` |
| **Q2(g)** | Faculty handling courses with ≥ 4 credits | `/courses/course[credits >= 4]/faculty` |
| **Q2(h)** | Course whose id is C104 | `/courses/course[@id = 'C104']` |
| **Q2(i)** | First course available in XML | `/courses/course[1]` |
| **Q2(j)** | Last course available in XML | `/courses/course[last()]` |

#### **Question 3: XSLT Presentation Transformation (10 Marks)**
Transforms `courses.xml` using `courses.xsl`:
- **Template Match**: `match="courses"`
- **Predicate Selection**: `select="course[students > 40]"`
- **Numeric Descending Sort**: `<xsl:sort select="students" data-type="number" order="descending" />`
- **Output Sequence**:
  1. *Artificial Intelligence* (72 students, 4 credits, Theory)
  2. *Machine Learning* (64 students, 4 credits, Theory)
  3. *Web Technology* (58 students, 4 credits, Theory)
  4. *Database Systems* (42 students, 3 credits, Theory)

#### **Question 4: Academic Data Interpretation (5 Marks)**
- **Highest Enrollment**: `AI302: Artificial Intelligence` (72 students).
- **Lowest Enrollment**: `WEB303: Web Technology Laboratory` (36 students).
- **Theory Course Proportion**: 4 out of 5 courses (80% curriculum load).
- **4-Credit Courses**: 3 courses (`WEB301`, `AI302`, `ML304`).
- **Additional TA Support Requirement**: 2 courses (`AI302` and `ML304` exceed the > 60 student threshold).

---

### ⚙️ Algorithms (Procedural Specifications)

#### **Algorithm 1: XML Structural Interpretation**
```text
1. Start
2. Parse courses.xml using DOMParser into an in-memory Document Object Model.
3. Identify top-level documentElement as the Root element (<courses>).
4. Enumerate child nodes to identify repeating entities (<course>).
5. Extract primary key attributes (id) verifying uniqueness across nodes.
6. Identify quantitative tags (<students>, <credits>) suitable for numerical operations.
7. Verify well-formedness rules (tag closure, nesting, attribute quotes).
8. Render structural audit matrix and interactive DOM tree.
9. Stop
```

#### **Algorithm 2: XPath Evaluation & Extraction**
```text
1. Start
2. Load active XML DOM.
3. Compile required XPath query string.
4. Call document.evaluate(expression, xmlDoc, null, XPathResult.ANY_TYPE, null).
5. Iterate through matched node results or evaluate scalar outcomes.
6. Format output into readable lists and bind to display cards.
7. Repeat for all 10 query specifications.
8. Stop
```

#### **Algorithm 3: XSLT Transformation**
```text
1. Start
2. Load courses.xml and stylesheet courses.xsl.
3. Instantiate XSLTProcessor and import compiled stylesheet DOM.
4. Execute template matching against root courses node.
5. Filter course nodes with predicate [students > 40].
6. Sort nodes numerically in descending sequence based on students count.
7. Transform into target HTML DocumentFragment.
8. Inject fragment into the presentation container.
9. Stop
```

#### **Algorithm 4: Data Interpretation & Pedagogical Analysis**
```text
1. Start
2. Iterate through loaded course entities.
3. Determine maximum student count and locate corresponding course (AI302).
4. Determine minimum student count and locate corresponding course (WEB303).
5. Filter records where type == 'Theory' and compute frequency.
6. Filter records where credits == 4 and list matching subject codes.
7. Identify courses exceeding 60 learners to allocate TA assistance.
8. Update analytical cards, interactive bar chart, and roster table.
9. Stop
```

---

### 🚀 How to Run Locally
1. Clone or open this folder in **VS Code**.
2. Right-click `index.html` and select **"Open with Live Server"** (recommended for loading local XML and XSLT files via `fetch()`).
3. Alternatively, open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari) — built-in robust fallbacks ensure full functionality.

---

### 🏆 Verification Checklist
- [x] **Q1 (5/5 M)**: XML root, entity, unique attribute, numeric elements & validation explained.
- [x] **Q2 (10/10 M)**: 10 live XPath queries with interactive results and custom sandbox.
- [x] **Q3 (10/10 M)**: XSLT transformation with threshold slider, dual code views, and table/source toggles.
- [x] **Q4 (5/5 M)**: Quantitative analytics, extreme deductions, TA allocations & visual bar chart.
- [x] **Zero External Files Added**: Only existing files (`index.html`, `style.css`, `script.js`, `courses.xml`, `courses.xsl`, `README.md`) modified.
