/**
 * Web Technology Unit IV - CO4 AT1
 * Course Enrollment Intelligence & XML Analytics Engine
 * Complete Interactive Logic & Dynamic Processors
 */

// --- Standard Academic Dataset (Fallback & Ground Truth) ---
const defaultCoursesData = [
  { id: 'C101', code: 'WEB301', name: 'Web Technology', faculty: 'Dr. Arun', students: 58, credits: 4, type: 'Theory' },
  { id: 'C102', code: 'AI302', name: 'Artificial Intelligence', faculty: 'Dr. Meena', students: 72, credits: 4, type: 'Theory' },
  { id: 'C103', code: 'WEB303', name: 'Web Technology Laboratory', faculty: 'Dr. Ravi', students: 36, credits: 2, type: 'Practical' },
  { id: 'C104', code: 'ML304', name: 'Machine Learning', faculty: 'Dr. Priya', students: 64, credits: 4, type: 'Theory' },
  { id: 'C105', code: 'DB305', name: 'Database Systems', faculty: 'Dr. Kumar', students: 42, credits: 3, type: 'Theory' }
];

const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<courses>
  <course id="C101">
    <code>WEB301</code>
    <name>Web Technology</name>
    <faculty>Dr. Arun</faculty>
    <students>58</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C102">
    <code>AI302</code>
    <name>Artificial Intelligence</name>
    <faculty>Dr. Meena</faculty>
    <students>72</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C103">
    <code>WEB303</code>
    <name>Web Technology Laboratory</name>
    <faculty>Dr. Ravi</faculty>
    <students>36</students>
    <credits>2</credits>
    <type>Practical</type>
  </course>
  <course id="C104">
    <code>ML304</code>
    <name>Machine Learning</name>
    <faculty>Dr. Priya</faculty>
    <students>64</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C105">
    <code>DB305</code>
    <name>Database Systems</name>
    <faculty>Dr. Kumar</faculty>
    <students>42</students>
    <credits>3</credits>
    <type>Theory</type>
  </course>
</courses>`;

// --- 10 Required Academic XPath Queries ---
const xpathQueries = [
  { id: 'Q2(a)', title: 'All course records', category: 'basic', expr: '/courses/course' },
  { id: 'Q2(b)', title: 'Names of all courses', category: 'basic', expr: '/courses/course/name' },
  { id: 'Q2(c)', title: 'Courses having more than 50 students', category: 'predicates', expr: '/courses/course[students > 50]' },
  { id: 'Q2(d)', title: 'Courses carrying 4 credits', category: 'predicates', expr: '/courses/course[credits = 4]' },
  { id: 'Q2(e)', title: 'Courses whose type is Theory', category: 'predicates', expr: "/courses/course[type = 'Theory']" },
  { id: 'Q2(f)', title: 'Names of Theory courses having > 50 students', category: 'predicates', expr: "/courses/course[type = 'Theory' and students > 50]/name" },
  { id: 'Q2(g)', title: 'Faculty handling courses with at least 4 credits', category: 'predicates', expr: '/courses/course[credits >= 4]/faculty' },
  { id: 'Q2(h)', title: 'The course whose id is C104', category: 'basic', expr: "/courses/course[@id = 'C104']" },
  { id: 'Q2(i)', title: 'The first course available in XML', category: 'positional', expr: '/courses/course[1]' },
  { id: 'Q2(j)', title: 'The last course available in XML', category: 'positional', expr: '/courses/course[last()]' }
];

// --- Interactive Quiz Questions ---
const quizQuestions = [
  {
    tag: 'QUESTION 1 &bull; XML STRUCTURE',
    text: 'What constitutes the unique identifier for each repeating course record in the XML document?',
    options: [
      { text: 'The <credits> element value', correct: false },
      { text: 'The id attribute on the <course> element (e.g. id="C101")', correct: true },
      { text: 'The root tag <courses>', correct: false },
      { text: 'The <type> element tag', correct: false }
    ],
    explanation: 'Attributes such as id="C101" provide unique keys to distinguish individual XML elements without adding child elements.'
  },
  {
    tag: 'QUESTION 2 &bull; XPATH SYNTAX',
    text: 'Which XPath expression selects only the names of Theory courses with more than 50 students?',
    options: [
      { text: "/courses/course[type = 'Theory' and students > 50]/name", correct: true },
      { text: "/courses/course/name[students > 50]", correct: false },
      { text: "/courses[type='Theory']/students", correct: false },
      { text: "//course[@credits=4]", correct: false }
    ],
    explanation: 'Predicates in square brackets filter nodes matching both conditions joined by the logical "and" operator, then select the child /name node.'
  },
  {
    tag: 'QUESTION 3 &bull; XSLT TRANSFORMATION',
    text: 'In XSLT, which element is used to sort numerical values in descending order?',
    options: [
      { text: '<xsl:filter order="descending" />', correct: false },
      { text: '<xsl:sort select="students" data-type="number" order="descending" />', correct: true },
      { text: '<xsl:order-by select="students" type="numeric" />', correct: false },
      { text: '<xsl:sequence sort="down" />', correct: false }
    ],
    explanation: '<xsl:sort> requires data-type="number" to ensure 72 is treated as greater than 58 rather than string-sorted.'
  },
  {
    tag: 'QUESTION 4 &bull; DATA INTERPRETATION',
    text: 'According to pedagogical analysis, which course requires additional Teaching Assistant (TA) support due to peak enrollment (>60 students)?',
    options: [
      { text: 'Database Systems (42 students)', correct: false },
      { text: 'Web Technology Lab (36 students)', correct: false },
      { text: 'Artificial Intelligence (72 students) & Machine Learning (64 students)', correct: true },
      { text: 'Web Technology only (58 students)', correct: false }
    ],
    explanation: 'Both AI302 (72 learners) and ML304 (64 learners) exceed the 60-student capacity threshold and require specialized lab/TA assistance.'
  }
];

// --- Global State ---
let xmlDocument = null;
let currentCourses = JSON.parse(JSON.stringify(defaultCoursesData));
let currentXslText = '';
let currentSortColumn = 'id';
let currentSortAsc = true;
let quizScore = 0;
let answeredCount = 0;

// Helper DOM selector
const $ = id => document.getElementById(id);

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  loadDataset();
});

// --- Theme Management ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} theme`);
}

// --- XML Parsing & Loading ---
function parseXML(text) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(text, 'application/xml');
  const parserError = parsed.querySelector('parsererror');
  if (parserError) {
    throw new Error('XML Well-Formedness Error: ' + parserError.textContent);
  }
  return parsed;
}

function generateXmlStringFromCourses(courseList) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<courses>\n`;
  courseList.forEach(c => {
    xml += `  <course id="${c.id}">\n`;
    xml += `    <code>${c.code}</code>\n`;
    xml += `    <name>${c.name}</name>\n`;
    xml += `    <faculty>${c.faculty}</faculty>\n`;
    xml += `    <students>${c.students}</students>\n`;
    xml += `    <credits>${c.credits}</credits>\n`;
    xml += `    <type>${c.type}</type>\n`;
    xml += `  </course>\n`;
  });
  xml += `</courses>`;
  return xml;
}

async function loadDataset() {
  try {
    const xmlResponse = await fetch('courses.xml');
    if (!xmlResponse.ok) throw new Error('HTTP error');
    const xmlText = await xmlResponse.text();
    xmlDocument = parseXML(xmlText);
    $('datasetSourceDesc').textContent = 'Live courses.xml (External)';
    $('engineStatusText').textContent = 'Live XML DOM Active';
  } catch (error) {
    xmlDocument = parseXML(fallbackXml);
    $('datasetSourceDesc').textContent = 'Embedded Standard Dataset';
    $('engineStatusText').textContent = 'XML Engine Active';
  }

  // Load courses array from the XML DOM
  syncCoursesFromXmlDoc();

  // Load XSLT source
  try {
    const xslResponse = await fetch('courses.xsl');
    if (xslResponse.ok) {
      currentXslText = await xslResponse.text();
      $('xslCode').textContent = currentXslText;
    }
  } catch (e) {
    $('xslCode').textContent = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="courses">
    <table>
      <thead><tr><th>Course Code</th><th>Course Name</th><th>Faculty</th><th>Students</th><th>Credits</th><th>Type</th></tr></thead>
      <tbody>
        <xsl:for-each select="course[students &gt; 40]">
          <xsl:sort select="students" data-type="number" order="descending" />
          <tr><td><xsl:value-of select="code" /></td><td><xsl:value-of select="name" /></td><td><xsl:value-of select="faculty" /></td><td><xsl:value-of select="students" /></td><td><xsl:value-of select="credits" /></td><td><xsl:value-of select="type" /></td></tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>`;
  }

  renderAllViews();
}

function syncCoursesFromXmlDoc() {
  const courseNodes = xmlDocument.querySelectorAll('course');
  currentCourses = Array.from(courseNodes).map(node => ({
    id: node.getAttribute('id') || 'C???',
    code: node.querySelector('code')?.textContent || '???',
    name: node.querySelector('name')?.textContent || 'Unknown',
    faculty: node.querySelector('faculty')?.textContent || 'Staff',
    students: Number(node.querySelector('students')?.textContent || 0),
    credits: Number(node.querySelector('credits')?.textContent || 0),
    type: node.querySelector('type')?.textContent || 'Theory'
  }));
}

// --- Master View Renderer ---
function renderAllViews() {
  renderXmlViewers();
  renderKpisAndHud();
  renderXPathGrid();
  renderFindingsAndCharts();
  renderDatasetTable();
  renderSimulatorControls();
  renderQuiz();
}

// --- Render XML Viewers (Raw & Interactive Tree) ---
function renderXmlViewers() {
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xmlDocument);
  $('xmlCode').textContent = xmlStr;
  $('xmlCodeQ3').textContent = xmlStr;

  // Build Interactive DOM Tree
  const treeContainer = $('xmlInteractiveTree');
  treeContainer.innerHTML = '';
  const rootNode = xmlDocument.documentElement;
  treeContainer.appendChild(buildDomTreeHtml(rootNode));
}

function buildDomTreeHtml(node) {
  const div = document.createElement('div');
  div.className = 'tree-node';

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tree-tag';
    tagSpan.textContent = `<${node.nodeName}`;

    // Attributes
    if (node.hasAttributes()) {
      for (let attr of node.attributes) {
        tagSpan.innerHTML += ` <span class="tree-attr">${attr.name}</span>=<span class="tree-val">"${escapeHtml(attr.value)}"</span>`;
      }
    }
    tagSpan.innerHTML += '>';

    div.appendChild(tagSpan);

    if (node.children.length > 0) {
      const childrenWrapper = document.createElement('div');
      for (let child of node.children) {
        childrenWrapper.appendChild(buildDomTreeHtml(child));
      }
      div.appendChild(childrenWrapper);

      tagSpan.title = 'Click to collapse/expand node';
      tagSpan.onclick = () => {
        childrenWrapper.classList.toggle('hidden');
      };
    } else {
      const textSpan = document.createElement('span');
      textSpan.className = 'tree-val';
      textSpan.textContent = node.textContent;
      div.appendChild(textSpan);
    }

    const closeTag = document.createElement('span');
    closeTag.className = 'tree-tag';
    closeTag.textContent = `</${node.nodeName}>`;
    div.appendChild(closeTag);
  }

  return div;
}

// --- Render KPIs & HUD ---
function renderKpisAndHud() {
  const totalCourses = currentCourses.length;
  const totalStudents = currentCourses.reduce((sum, c) => sum + c.students, 0);
  const avgStudents = totalCourses ? (totalStudents / totalCourses).toFixed(1) : 0;
  const theoryCount = currentCourses.filter(c => c.type === 'Theory').length;
  const practicalCount = currentCourses.filter(c => c.type === 'Practical').length;
  const totalCredits = currentCourses.reduce((sum, c) => sum + c.credits, 0);
  const maxStudents = totalCourses ? Math.max(...currentCourses.map(c => c.students)) : 0;

  // Header & KPI elements
  $('statCourses').textContent = totalCourses;
  $('statStudents').textContent = totalStudents;
  $('statAverage').textContent = avgStudents;
  $('statTypes').textContent = `${theoryCount} / ${practicalCount}`;
  $('statCredits').textContent = totalCredits;

  // Hero HUD elements
  $('hudCourseCount').textContent = totalCourses;
  $('hudTotalStudents').textContent = totalStudents;
  $('hudMaxStudents').textContent = maxStudents;
  $('hudTypeRatio').textContent = `${theoryCount} / ${practicalCount}`;

  // HUD mini chart
  const hudChartMini = $('hudChartMini');
  if (hudChartMini && totalCourses) {
    hudChartMini.innerHTML = currentCourses.map(c => {
      const percent = Math.min(100, Math.round((c.students / 80) * 100));
      const isPeak = c.students > 60;
      return `
        <div class="hud-bar-col ${isPeak ? 'highlight' : ''}" style="--val: ${percent}%;" title="${escapeHtml(c.code)}: ${c.students} students">
          <span>${c.students}</span>
          <small>${escapeHtml(c.code.slice(0, 3))}</small>
        </div>
      `;
    }).join('');
  }
}

// --- XPath Execution Engine ---
function evaluateXPath(expression, targetDoc = xmlDocument) {
  try {
    const startTime = performance.now();
    const result = targetDoc.evaluate(expression, targetDoc, null, XPathResult.ANY_TYPE, null);
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    const values = [];
    let node;

    if (result.resultType === XPathResult.NUMBER_TYPE) {
      return { values: [String(result.numberValue)], type: 'Number', duration };
    }
    if (result.resultType === XPathResult.STRING_TYPE) {
      return { values: [result.stringValue], type: 'String', duration };
    }
    if (result.resultType === XPathResult.BOOLEAN_TYPE) {
      return { values: [String(result.booleanValue)], type: 'Boolean', duration };
    }

    while ((node = result.iterateNext())) {
      if (node.nodeType === Node.ATTRIBUTE_NODE) {
        values.push(`${node.name}="${node.value}"`);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // If it's a course node, format summary
        if (node.nodeName === 'course') {
          const id = node.getAttribute('id');
          const code = node.querySelector('code')?.textContent || '';
          const name = node.querySelector('name')?.textContent || '';
          const students = node.querySelector('students')?.textContent || '';
          values.push(`[${id}] ${code}: ${name} (${students} students)`);
        } else {
          values.push(node.textContent.trim());
        }
      } else {
        values.push(node.textContent.trim());
      }
    }

    return { values, type: 'NodeSet', duration };
  } catch (error) {
    return { values: [], error: error.message, duration: 0 };
  }
}

// --- Render Q2 XPath Grid ---
function renderXPathGrid(filter = 'all') {
  const container = $('xpathCards');
  container.innerHTML = '';

  const filteredQueries = xpathQueries.filter(q => filter === 'all' || q.category === filter);

  filteredQueries.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'xpath-query-card';
    card.innerHTML = `
      <div>
        <div class="qcard-header">
          <span class="qcard-tag">${q.id}</span>
          <span class="qcard-idx">${String(index + 1).padStart(2, '0')} / 10</span>
        </div>
        <div class="qcard-title">${q.title}</div>
      </div>
      <div class="qcard-expr-box">
        <code>${escapeHtml(q.expr)}</code>
        <button class="btn-run-single-xpath" data-expr="${escapeHtml(q.expr)}" data-target="res_${q.id.replace(/[^a-zA-Z0-9]/g, '')}">Run ↗</button>
      </div>
      <div class="qcard-result-box" id="res_${q.id.replace(/[^a-zA-Z0-9]/g, '')}">
        <span class="empty-state-text">Click "Run" to evaluate node query.</span>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach single run event handlers
  container.querySelectorAll('.btn-run-single-xpath').forEach(btn => {
    btn.onclick = () => {
      const expr = btn.getAttribute('data-expr');
      const targetId = btn.getAttribute('data-target');
      const targetBox = $(targetId);
      const res = evaluateXPath(expr);

      if (res.error) {
        targetBox.innerHTML = `<span style="color: var(--accent-coral);">Error: ${escapeHtml(res.error)}</span>`;
      } else if (res.values.length === 0) {
        targetBox.innerHTML = `<span class="empty-state-text">No matching nodes found.</span>`;
      } else {
        targetBox.innerHTML = `<ul>${res.values.map(v => `<li>${escapeHtml(v)}</li>`).join('')}</ul>`;
      }
    };
  });
}

function runAllXPathQueries() {
  xpathQueries.forEach(q => {
    const targetId = `res_${q.id.replace(/[^a-zA-Z0-9]/g, '')}`;
    const targetBox = $(targetId);
    if (targetBox) {
      const res = evaluateXPath(q.expr);
      if (res.values.length > 0) {
        targetBox.innerHTML = `<ul>${res.values.map(v => `<li>${escapeHtml(v)}</li>`).join('')}</ul>`;
      } else {
        targetBox.innerHTML = `<span class="empty-state-text">No matching nodes.</span>`;
      }
    }
  });
  showToast('Executed all 10 XPath expressions successfully.');
}

function clearAllXPathResults() {
  xpathQueries.forEach(q => {
    const targetId = `res_${q.id.replace(/[^a-zA-Z0-9]/g, '')}`;
    const targetBox = $(targetId);
    if (targetBox) {
      targetBox.innerHTML = `<span class="empty-state-text">Click "Run" to evaluate node query.</span>`;
    }
  });
  showToast('Reset XPath query results.');
}

// Custom XPath Sandbox
function evaluateCustomXPath() {
  const input = $('customXpathInput').value.trim();
  const output = $('customXpathOutput');
  const metrics = $('sandboxMetrics');

  if (!input) {
    output.innerHTML = `<span class="empty-state-text">Please enter a valid XPath query.</span>`;
    return;
  }

  const res = evaluateXPath(input);

  if (res.error) {
    metrics.innerHTML = `<span style="color: var(--accent-coral);">Syntax Error</span>`;
    output.innerHTML = `<div style="color: var(--accent-coral); font-family: var(--font-mono);">XPath Evaluation Error: ${escapeHtml(res.error)}</div>`;
  } else {
    metrics.innerHTML = `<span>Matched: <strong>${res.values.length}</strong> items (${res.duration}ms)</span>`;
    if (res.values.length === 0) {
      output.innerHTML = `<div class="empty-state-text">Query executed successfully, 0 nodes matched.</div>`;
    } else {
      output.innerHTML = `
        <div style="margin-bottom: 0.35rem; color: var(--text-muted); font-size: 0.75rem;">Return Type: ${res.type}</div>
        <ul>${res.values.map(v => `<li>${escapeHtml(v)}</li>`).join('')}</ul>
      `;
    }
  }
}

// --- Q3 XSLT Transformation Engine ---
async function runXSLTTransformation() {
  const threshold = Number($('xsltThresholdRange').value) || 40;
  const resultDisplay = $('xsltResult');
  const rawSourceDisplay = $('rawHtmlOutput');

  try {
    let xslDoc;
    if (currentXslText) {
      // Modify threshold dynamically in stylesheet if needed
      let dynamicXsl = currentXslText.replace(/students\s*&gt;\s*\d+/g, `students &gt; ${threshold}`);
      xslDoc = parseXML(dynamicXsl);
    } else {
      throw new Error('No XSLT available');
    }

    if (window.XSLTProcessor) {
      const processor = new XSLTProcessor();
      processor.importStylesheet(xslDoc);
      const fragment = processor.transformToFragment(xmlDocument, document);

      resultDisplay.innerHTML = '';
      resultDisplay.appendChild(fragment);

      const generatedTable = resultDisplay.querySelector('table');
      if (generatedTable) {
        generatedTable.className = 'modern-table';
        rawSourceDisplay.textContent = generatedTable.outerHTML;
      }
      showToast(`XSLT Transformation executed (Students > ${threshold})`);
    } else {
      throw new Error('XSLTProcessor unsupported');
    }
  } catch (error) {
    // Robust Fallback Simulation matching XSLT specification
    const filtered = currentCourses
      .filter(c => c.students > threshold)
      .sort((a, b) => b.students - a.students);

    let html = `
      <table class="modern-table">
        <thead>
          <tr><th>Course Code</th><th>Course Name</th><th>Faculty</th><th>Students</th><th>Credits</th><th>Type</th></tr>
        </thead>
        <tbody>
    `;

    filtered.forEach(c => {
      html += `
        <tr>
          <td><code class="tag-badge">${escapeHtml(c.code)}</code></td>
          <td><strong>${escapeHtml(c.name)}</strong></td>
          <td>${escapeHtml(c.faculty)}</td>
          <td><strong style="color: var(--accent-cyan);">${c.students}</strong></td>
          <td>${c.credits}</td>
          <td><span class="badge-neutral">${escapeHtml(c.type)}</span></td>
        </tr>
      `;
    });

    html += `</tbody></table>`;

    if (filtered.length === 0) {
      html = `<div class="empty-state-large"><p>No courses exceed ${threshold} students.</p></div>`;
    }

    resultDisplay.innerHTML = html;
    rawSourceDisplay.textContent = html;
    showToast(`Transformed ${filtered.length} courses (threshold > ${threshold})`);
  }
}

// --- Q4 Data Interpretation & Analytics ---
function renderFindingsAndCharts() {
  if (currentCourses.length === 0) return;

  const highest = currentCourses.reduce((max, c) => c.students > max.students ? c : max, currentCourses[0]);
  const lowest = currentCourses.reduce((min, c) => c.students < min.students ? c : min, currentCourses[0]);
  const theoryCourses = currentCourses.filter(c => c.type === 'Theory');
  const fourCreditCourses = currentCourses.filter(c => c.credits === 4);
  const taSupportCourses = currentCourses.filter(c => c.students > 60);

  // Findings Cards
  const findings = [
    { label: 'Highest Enrollment', title: highest.name, metric: `${highest.students} Learners (${highest.code})`, style: 'card-coral' },
    { label: 'Lowest Enrollment', title: lowest.name, metric: `${lowest.students} Learners (${lowest.code})`, style: 'card-blue' },
    { label: 'Theory Courses', title: `${theoryCourses.length} Subjects`, metric: `${Math.round((theoryCourses.length / currentCourses.length) * 100)}% of Curriculum`, style: 'card-green' },
    { label: '4-Credit Courses', title: `${fourCreditCourses.length} Courses`, metric: `${fourCreditCourses.map(c => c.code).join(', ')}`, style: 'card-amber' },
    { label: 'Additional TA Support', title: `${taSupportCourses.length} Sections`, metric: `Exceeds 60 threshold`, style: 'card-purple' }
  ];

  $('interpretationCards').innerHTML = findings.map(f => `
    <div class="finding-card ${f.style}">
      <span class="finding-tag">${f.label}</span>
      <div class="finding-title">${escapeHtml(f.title)}</div>
      <div class="finding-metric">${escapeHtml(f.metric)}</div>
    </div>
  `).join('');

  // Interactive Bar Chart
  const chartContainer = $('interactiveBarChart');
  const maxEnrollment = Math.max(...currentCourses.map(c => c.students), 80);

  chartContainer.innerHTML = currentCourses.map(c => {
    const heightPercent = Math.round((c.students / maxEnrollment) * 100);
    const isPeak = c.students > 60;
    const isHigh = c.students > 40 && !isPeak;
    const barClass = isPeak ? 'peak-bar' : (isHigh ? 'high-bar' : '');

    return `
      <div class="chart-bar-group">
        <div class="chart-bar ${barClass}" style="--bar-height: ${heightPercent}%;" title="${escapeHtml(c.name)}: ${c.students} Students">
          <span class="bar-tooltip">${c.students}</span>
        </div>
        <div class="bar-label">${escapeHtml(c.code)}</div>
      </div>
    `;
  }).join('');

  // Course-level breakdown table
  $('q4RowCount').textContent = `${currentCourses.length} Courses Analyzed`;
  $('interpretationTable').innerHTML = currentCourses.map(c => {
    const isTaRequired = c.students > 60;
    return `
      <tr>
        <td><strong>${escapeHtml(c.name)}</strong></td>
        <td><code class="tag-badge">${escapeHtml(c.code)}</code></td>
        <td>${escapeHtml(c.faculty)}</td>
        <td><strong style="color: var(--accent-cyan); font-family: var(--font-mono);">${c.students}</strong></td>
        <td>${c.credits}</td>
        <td><span class="badge-neutral">${escapeHtml(c.type)}</span></td>
        <td>
          ${isTaRequired
            ? '<span class="ta-badge">⚠️ TA Required (&gt;60)</span>'
            : '<span class="ta-badge-ok">✓ Standard Class</span>'}
        </td>
      </tr>
    `;
  }).join('');
}

// --- Dataset Explorer & Table Filter / Sorting ---
function renderDatasetTable() {
  const searchTerm = $('searchInput')?.value.toLowerCase().trim() || '';
  const typeFilter = $('typeFilter')?.value || 'All';
  const creditsFilter = $('creditsFilter')?.value || 'All';

  let filtered = currentCourses.filter(c => {
    const matchesSearch = !searchTerm || [c.id, c.code, c.name, c.faculty, c.type].some(v => v.toLowerCase().includes(searchTerm));
    const matchesType = typeFilter === 'All' || c.type === typeFilter;
    const matchesCredits = creditsFilter === 'All' || String(c.credits) === creditsFilter;
    return matchesSearch && matchesType && matchesCredits;
  });

  // Sorting
  filtered.sort((a, b) => {
    let valA = a[currentSortColumn];
    let valB = b[currentSortColumn];
    if (typeof valA === 'string') {
      return currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return currentSortAsc ? valA - valB : valB - valA;
  });

  const tbody = $('courseTable');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No courses match current filter criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td><code class="tag-badge">${escapeHtml(c.id)}</code></td>
      <td><code>${escapeHtml(c.code)}</code></td>
      <td><strong>${escapeHtml(c.name)}</strong></td>
      <td>${escapeHtml(c.faculty)}</td>
      <td><strong style="color: var(--accent-cyan); font-family: var(--font-mono);">${c.students}</strong></td>
      <td>${c.credits}</td>
      <td><span class="badge-neutral">${escapeHtml(c.type)}</span></td>
    </tr>
  `).join('');
}

// --- Live Course Simulator Drawer ---
function renderSimulatorControls() {
  const list = $('simCourseList');
  list.innerHTML = currentCourses.map((c, i) => `
    <div class="sim-course-item">
      <div class="sim-course-head">
        <span class="sim-course-name">${escapeHtml(c.code)}: ${escapeHtml(c.name)}</span>
        <span class="sim-course-val" id="simVal_${i}">${c.students} Students</span>
      </div>
      <input type="range" min="15" max="100" value="${c.students}" data-index="${i}" class="sim-slider">
    </div>
  `).join('');

  list.querySelectorAll('.sim-slider').forEach(slider => {
    slider.oninput = () => {
      const idx = Number(slider.dataset.index);
      const val = Number(slider.value);
      $(`simVal_${idx}`).textContent = `${val} Students`;
      currentCourses[idx].students = val;
    };
  });
}

function applySimulatorChanges() {
  // Regenerate XML DOM from modified currentCourses
  const updatedXmlText = generateXmlStringFromCourses(currentCourses);
  xmlDocument = parseXML(updatedXmlText);
  renderAllViews();
  $('simulatorModal').classList.remove('open');
  showToast('Recalculated XML DOM, XPath, XSLT, and Analytics!');
}

function resetSimulatorDataset() {
  currentCourses = JSON.parse(JSON.stringify(defaultCoursesData));
  const defaultXmlText = generateXmlStringFromCourses(currentCourses);
  xmlDocument = parseXML(defaultXmlText);
  renderAllViews();
  $('simulatorModal').classList.remove('open');
  showToast('Restored standard academic dataset.');
}

// --- Interactive Quiz Component ---
function renderQuiz() {
  const grid = $('quizGrid');
  grid.innerHTML = quizQuestions.map((q, qIndex) => `
    <div class="quiz-card" id="quizCard_${qIndex}">
      <span class="quiz-question-tag">${q.tag}</span>
      <div class="quiz-question-text">${q.text}</div>
      <div class="quiz-options-group">
        ${q.options.map((opt, optIndex) => `
          <button class="quiz-option-btn" data-q="${qIndex}" data-opt="${optIndex}" data-correct="${opt.correct}">
            ${escapeHtml(opt.text)}
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback-box" id="quizFeedback_${qIndex}"></div>
    </div>
  `).join('');

  grid.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.onclick = () => {
      const qIdx = Number(btn.dataset.q);
      const isCorrect = btn.dataset.correct === 'true';
      const card = $(`quizCard_${qIdx}`);
      const feedback = $(`quizFeedback_${qIdx}`);

      // Disable other buttons on this card
      card.querySelectorAll('.quiz-option-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') {
          b.classList.add('correct');
        }
      });

      if (isCorrect) {
        btn.classList.add('correct');
        feedback.style.color = 'var(--accent-emerald)';
        feedback.innerHTML = `<strong>✓ Correct!</strong> ${quizQuestions[qIdx].explanation}`;
        quizScore++;
      } else {
        btn.classList.add('wrong');
        feedback.style.color = 'var(--accent-coral)';
        feedback.innerHTML = `<strong>✗ Incorrect.</strong> ${quizQuestions[qIdx].explanation}`;
      }

      feedback.classList.add('show');
      answeredCount++;
      $('quizScoreBadge').textContent = `Score: ${quizScore} / 4`;
    };
  });
}

// --- Data Export Utilities ---
function exportCsv() {
  let csv = 'ID,Course Code,Course Name,Faculty,Students,Credits,Type\n';
  currentCourses.forEach(c => {
    csv += `"${c.id}","${c.code}","${c.name}","${c.faculty}",${c.students},${c.credits},"${c.type}"\n`;
  });

  downloadFile(csv, 'courses_enrollment_data.csv', 'text/csv');
  showToast('Exported dataset as CSV.');
}

function exportJson() {
  const jsonStr = JSON.stringify(currentCourses, null, 2);
  downloadFile(jsonStr, 'courses_enrollment_data.json', 'application/json');
  showToast('Exported dataset as JSON.');
}

function downloadFile(content, fileName, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

// --- Utility Functions ---
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function showToast(message) {
  const toast = $('toastNotification');
  const msgSpan = $('toastMessage');
  msgSpan.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3800);
}

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Theme Toggle
  $('themeToggle')?.addEventListener('click', toggleTheme);

  // Mobile Menu & Sidebar
  $('menuToggle')?.addEventListener('click', () => $('sidebar').classList.toggle('open'));
  document.querySelectorAll('.side-link, .nav-link').forEach(link => {
    link.addEventListener('click', () => $('sidebar').classList.remove('open'));
  });

  // Hero Quick Buttons
  $('runAllXpathHeroBtn')?.addEventListener('click', () => {
    window.location.hash = '#q2';
    runAllXPathQueries();
  });
  $('triggerXsltHeroBtn')?.addEventListener('click', () => {
    window.location.hash = '#q3';
    runXSLTTransformation();
  });

  // Q1 Code & Tree Viewers
  $('tabRawXml')?.addEventListener('click', () => {
    $('tabRawXml').classList.add('active');
    $('tabTreeXml').classList.remove('active');
    $('rawXmlContainer').classList.remove('hidden');
    $('treeXmlContainer').classList.add('hidden');
  });
  $('tabTreeXml')?.addEventListener('click', () => {
    $('tabTreeXml').classList.add('active');
    $('tabRawXml').classList.remove('active');
    $('treeXmlContainer').classList.remove('hidden');
    $('rawXmlContainer').classList.add('hidden');
  });
  $('toggleXmlTreeBtn')?.addEventListener('click', () => {
    $('tabTreeXml').click();
  });
  $('copyXmlBtn')?.addEventListener('click', () => {
    const text = $('xmlCode').textContent;
    navigator.clipboard.writeText(text).then(() => showToast('XML copied to clipboard!'));
  });

  // Q2 XPath Engine
  $('runAllXpathBtn')?.addEventListener('click', runAllXPathQueries);
  $('clearAllXpathBtn')?.addEventListener('click', clearAllXPathResults);
  $('runCustomXpathBtn')?.addEventListener('click', evaluateCustomXPath);
  $('customXpathInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') evaluateCustomXPath();
  });

  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $('customXpathInput').value = btn.dataset.query;
      evaluateCustomXPath();
    });
  });

  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderXPathGrid(pill.dataset.filter);
    });
  });

  // Q3 XSLT Controls
  $('runXslt')?.addEventListener('click', runXSLTTransformation);
  $('xsltThresholdRange')?.addEventListener('input', e => {
    const val = e.target.value;
    $('xsltThresholdVal').textContent = val;
    $('ruleThreshold').textContent = val;
    runXSLTTransformation();
  });

  $('btnViewRendered')?.addEventListener('click', () => {
    $('btnViewRendered').classList.add('active');
    $('btnViewSource').classList.remove('active');
    $('xsltResult').classList.remove('hidden');
    $('xsltRawSource').classList.add('hidden');
  });

  $('btnViewSource')?.addEventListener('click', () => {
    $('btnViewSource').classList.add('active');
    $('btnViewRendered').classList.remove('active');
    $('xsltRawSource').classList.remove('hidden');
    $('xsltResult').classList.add('hidden');
  });

  // Dataset Search & Filters
  $('searchInput')?.addEventListener('input', renderDatasetTable);
  $('typeFilter')?.addEventListener('change', renderDatasetTable);
  $('creditsFilter')?.addEventListener('change', renderDatasetTable);

  // Table Column Sort
  document.querySelectorAll('.sortable-table th').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (currentSortColumn === col) {
        currentSortAsc = !currentSortAsc;
      } else {
        currentSortColumn = col;
        currentSortAsc = true;
      }
      renderDatasetTable();
    });
  });

  // Export Buttons
  $('exportCsvBtn')?.addEventListener('click', exportCsv);
  $('exportJsonBtn')?.addEventListener('click', exportJson);
  $('quickReportBtn')?.addEventListener('click', () => window.print());

  // Simulator Drawer
  $('openSimulatorBtn')?.addEventListener('click', () => $('simulatorModal').classList.add('open'));
  $('closeSimulatorBtn')?.addEventListener('click', () => $('simulatorModal').classList.remove('open'));
  $('closeSimulatorBackdrop')?.addEventListener('click', () => $('simulatorModal').classList.remove('open'));
  $('simApplyBtn')?.addEventListener('click', applySimulatorChanges);
  $('simResetBtn')?.addEventListener('click', resetSimulatorDataset);

  // Scrollspy for Navigation Links
  const sections = document.querySelectorAll('.section-anchor');
  const navLinks = document.querySelectorAll('.top-nav .nav-link, .side-nav .side-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -60%' });

  sections.forEach(s => observer.observe(s));
}