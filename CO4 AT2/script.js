/**
 * IT Service Request Management System - Unit IV (CO4-AT2)
 * Interactive Controller & View Simulator, Lifecycle Tracer, Ticket Queue & Analytics Engine
 * Candidate: Raghupathy M | Reg No: 192521438 | Dept: B.Tech IT
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigationTabs();
    initSampleDataGenerator();
    initFormSimulator();
    initTicketQueue();
    initReports();
    initVivaVoce();
    initRealTimeSlaPreview();
    initCharCounter();
});

// =============================================================
// GLOBAL STATE & PRESET DATA
// =============================================================

let requestCounter = 1004;

// Default initial tickets in the system
let sampleTickets = [
    {
        id: 'SR-1001',
        empId: 'EMP-192521438',
        name: 'Raghupathy M',
        dept: 'B.Tech IT',
        category: 'Network',
        priority: 'High',
        desc: 'Gateway timeout error when accessing remote Kubernetes cluster staging server via internal VPN.',
        timestamp: '2026-09-03 08:30:15',
        status: 'In Progress',
        sla: 'Within 4 Hours (Critical SLA)'
    },
    {
        id: 'SR-1002',
        empId: 'EMP-192521438',
        name: 'Raghupathy M',
        dept: 'B.Tech IT',
        category: 'Software',
        priority: 'Medium',
        desc: 'IntelliJ IDEA Ultimate license token renewal failed on development workstation (vm-node-02).',
        timestamp: '2026-09-03 08:45:20',
        status: 'Open / In Queue',
        sla: 'Within 24 Hours (Standard SLA)'
    },
    {
        id: 'SR-1003',
        empId: 'EMP-192521439',
        name: 'Kavitha S',
        dept: 'Human Resources',
        category: 'Account',
        priority: 'High',
        desc: 'Corporate HRMS portal MFA 2-factor authentication token expired and requires security reset.',
        timestamp: '2026-09-03 09:00:45',
        status: 'Assigned',
        sla: 'Within 4 Hours (Critical SLA)'
    },
    {
        id: 'SR-1004',
        empId: 'EMP-192521440',
        name: 'Arun Kumar',
        dept: 'Quality Assurance',
        category: 'Hardware',
        priority: 'Low',
        desc: 'Secondary 4K test monitor display flickers intermittently during automated UI regression testing.',
        timestamp: '2026-09-03 09:15:00',
        status: 'Resolved',
        sla: 'Within 48-72 Hours (Normal SLA)'
    }
];

// Presets featuring candidate details
const samplePresets = [
    {
        empId: 'EMP-192521438',
        name: 'Raghupathy M',
        dept: 'B.Tech IT',
        category: 'Network',
        priority: 'High',
        desc: 'VPN gateway timeout error occurred when connecting to the remote Kubernetes cluster staging environment.'
    },
    {
        empId: 'EMP-192521438',
        name: 'Raghupathy M',
        dept: 'B.Tech IT',
        category: 'Software',
        priority: 'Medium',
        desc: 'Docker Desktop WSL 2 integration failed after recent security patch update. Need reinstall & daemon reconfiguration.'
    },
    {
        empId: 'EMP-192521438',
        name: 'Raghupathy M',
        dept: 'B.Tech IT',
        category: 'Account',
        priority: 'High',
        desc: 'GitHub Enterprise organization repository write access revoked after annual SSO policy refresh.'
    },
    {
        empId: 'EMP-192521438',
        name: 'Raghupathy M',
        dept: 'B.Tech IT',
        category: 'Hardware',
        priority: 'Low',
        desc: 'Requesting an additional USB-C dual-display hub for multi-screen cloud architecture modeling.'
    }
];

let presetIndex = 0;

// =============================================================
// AUDIO FEEDBACK SYNTHESIZER (WEB AUDIO API)
// =============================================================
function playClickSound(freq = 600, type = 'sine', duration = 0.05) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // AudioContext not allowed or supported
    }
}

// =============================================================
// TOAST NOTIFICATIONS
// =============================================================
function showToast(message, icon = 'ℹ️') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// =============================================================
// TAB NAVIGATION SWITCHER
// =============================================================
function initNavigationTabs() {
    const tabs = document.querySelectorAll('#mainNavTabs .tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            playClickSound(520, 'triangle', 0.04);
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetContent = document.getElementById(`tab-${target}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Trigger report render if switching to reports
            if (target === 'reports') {
                renderReport();
            }
        });
    });
}

// =============================================================
// SAMPLE PRESET GENERATOR
// =============================================================
function initSampleDataGenerator() {
    const btnFill = document.getElementById('btnFillSample');
    if (btnFill) {
        btnFill.addEventListener('click', () => {
            applyPreset(presetIndex % samplePresets.length);
            presetIndex++;
        });
    }

    // Connect Quick Preset Chips if present
    document.querySelectorAll('.preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const idx = parseInt(chip.getAttribute('data-preset-idx'), 10);
            if (!isNaN(idx)) {
                applyPreset(idx);
            }
        });
    });
}

function applyPreset(index) {
    const sample = samplePresets[index % samplePresets.length];
    playClickSound(750, 'sine', 0.06);

    const elEmpId = document.getElementById('simEmpId');
    const elEmpName = document.getElementById('simEmpName');
    const elDept = document.getElementById('simDept');
    const elCat = document.getElementById('simCategory');
    const elDesc = document.getElementById('simDesc');

    if (elEmpId) elEmpId.value = sample.empId;
    if (elEmpName) elEmpName.value = sample.name;
    if (elDept) elDept.value = sample.dept;
    if (elCat) elCat.value = sample.category;
    if (elDesc) {
        elDesc.value = sample.desc;
        updateCharCount();
    }

    const prioRadio = document.querySelector(`input[name="simPriority"][value="${sample.priority}"]`);
    if (prioRadio) prioRadio.checked = true;

    // Clear previous error states
    const errorBox = document.getElementById('simErrorBox');
    if (errorBox) errorBox.style.display = 'none';

    const statusBadge = document.getElementById('lifecycleStatusBadge');
    if (statusBadge) {
        statusBadge.className = 'pill-badge badge-info';
        statusBadge.textContent = 'Status: Preset Loaded for ' + sample.name;
    }

    updateSlaPreview();
    showToast(`Loaded preset for ${sample.name} (${sample.category})`, '📋');
}

// =============================================================
// REAL-TIME CHARACTER COUNTER & SLA PREVIEW
// =============================================================
function initCharCounter() {
    const desc = document.getElementById('simDesc');
    if (desc) {
        desc.addEventListener('input', updateCharCount);
        updateCharCount();
    }
}

function updateCharCount() {
    const desc = document.getElementById('simDesc');
    const countEl = document.getElementById('descCharCount');
    if (!desc || !countEl) return;

    const len = desc.value.trim().length;
    countEl.textContent = `${len} chars (min 10)`;
    if (len >= 10) {
        countEl.style.color = '#10b981';
    } else if (len > 0) {
        countEl.style.color = '#f59e0b';
    } else {
        countEl.style.color = 'var(--text-dim)';
    }
}

function initRealTimeSlaPreview() {
    const prioRadios = document.querySelectorAll('input[name="simPriority"]');
    prioRadios.forEach(r => r.addEventListener('change', updateSlaPreview));

    const deptSelect = document.getElementById('simDept');
    if (deptSelect) deptSelect.addEventListener('change', updateSlaPreview);
}

function updateSlaPreview() {
    const priorityEl = document.querySelector('input[name="simPriority"]:checked');
    const priority = priorityEl ? priorityEl.value : 'Medium';
    const previewEl = document.getElementById('slaPreviewTarget');
    if (!previewEl) return;

    if (priority === 'High') {
        previewEl.innerHTML = '<span style="color: #f87171;">⚡ Critical SLA: &lt; 4 Hours Turnaround</span>';
    } else if (priority === 'Medium') {
        previewEl.innerHTML = '<span style="color: #fbbf24;">⏱️ Standard SLA: &lt; 24 Hours Turnaround</span>';
    } else {
        previewEl.innerHTML = '<span style="color: #34d399;">🕒 Normal SLA: 48 - 72 Hours Turnaround</span>';
    }
}

// =============================================================
// INTERACTIVE MVC FORM SIMULATOR
// =============================================================
function initFormSimulator() {
    const form = document.getElementById('simRequestForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Extract values
        const empId = (document.getElementById('simEmpId')?.value || '').trim();
        const empName = (document.getElementById('simEmpName')?.value || '').trim();
        const dept = (document.getElementById('simDept')?.value || '').trim();
        const category = (document.getElementById('simCategory')?.value || '').trim();
        const desc = (document.getElementById('simDesc')?.value || '').trim();
        const priorityEl = document.querySelector('input[name="simPriority"]:checked');
        const priority = priorityEl ? priorityEl.value : '';

        // 2. Simulated Controller Validation (Replicating ServiceRequestServlet.java)
        const errors = [];
        if (!empId) {
            errors.push("Employee ID is required.");
        } else if (!/^[a-zA-Z0-9_-]{3,20}$/.test(empId)) {
            errors.push("Employee ID must be 3-20 alphanumeric characters (e.g. EMP-192521438).");
        }

        if (!empName) {
            errors.push("Employee Name is required.");
        } else if (empName.length < 2) {
            errors.push("Employee Name must be at least 2 characters long.");
        }

        if (!dept) {
            errors.push("Please select a valid Department.");
        }

        if (!category) {
            errors.push("Please select a Problem Category.");
        }

        if (!desc) {
            errors.push("Problem Description is required.");
        } else if (desc.length < 10) {
            errors.push("Problem Description must contain at least 10 characters explaining the issue.");
        }

        if (!priority) {
            errors.push("Please select a Priority level.");
        }

        const errorBox = document.getElementById('simErrorBox');
        const errorList = document.getElementById('simErrorList');
        const statusBadge = document.getElementById('lifecycleStatusBadge');

        if (errors.length > 0) {
            playClickSound(300, 'sawtooth', 0.12);
            if (errorList) errorList.innerHTML = errors.map(err => `<li>${err}</li>`).join('');
            if (errorBox) errorBox.style.display = 'flex';
            if (statusBadge) {
                statusBadge.className = 'pill-badge badge-danger';
                statusBadge.textContent = 'Validation Failed: ' + errors.length + ' error(s) found';
            }
            showToast('Validation failed. Please fix highlighted errors.', '⚠️');
            return;
        }

        // Validation Succeeded
        if (errorBox) errorBox.style.display = 'none';
        playClickSound(800, 'sine', 0.08);

        // 3. Trigger Lifecycle Animation
        animateMvcPipeline(empId, empName, dept, category, desc, priority);
    });
}

/**
 * Animate the MVC Lifecycle steps visually with luminous borders
 */
function animateMvcPipeline(empId, empName, dept, category, desc, priority) {
    const statusBadge = document.getElementById('lifecycleStatusBadge');
    const stepView = document.getElementById('stepViewInput');
    const stepCtrl = document.getElementById('stepController');
    const stepModel = document.getElementById('stepModel');

    // Step 1: View (JSP Form)
    if (statusBadge) {
        statusBadge.className = 'pill-badge badge-warning';
        statusBadge.textContent = 'Step 1: View (serviceRequest.jsp) Dispatching HTTP POST...';
    }
    if (stepView) {
        stepView.style.borderColor = '#38bdf8';
        stepView.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.5)';
    }

    setTimeout(() => {
        // Step 2: Controller (Servlet)
        playClickSound(650, 'sine', 0.04);
        if (statusBadge) {
            statusBadge.className = 'pill-badge badge-primary';
            statusBadge.textContent = 'Step 2: Controller (ServiceRequestServlet) Validating & Creating Model...';
        }
        if (stepView) {
            stepView.style.borderColor = 'var(--border-card)';
            stepView.style.boxShadow = 'none';
        }
        if (stepCtrl) {
            stepCtrl.style.borderColor = '#818cf8';
            stepCtrl.style.boxShadow = '0 0 20px rgba(129, 140, 248, 0.5)';
        }

        setTimeout(() => {
            // Step 3: Model JavaBean
            playClickSound(750, 'sine', 0.04);
            if (statusBadge) {
                statusBadge.className = 'pill-badge badge-info';
                statusBadge.textContent = 'Step 3: Model (ServiceRequest.java) JavaBean Instantiated in Request Scope...';
            }
            if (stepCtrl) {
                stepCtrl.style.borderColor = 'var(--border-card)';
                stepCtrl.style.boxShadow = 'none';
            }
            if (stepModel) {
                stepModel.style.borderColor = '#34d399';
                stepModel.style.boxShadow = '0 0 20px rgba(52, 211, 153, 0.5)';
            }

            setTimeout(() => {
                // Step 4: Acknowledgement JSP
                playClickSound(950, 'sine', 0.1);
                if (statusBadge) {
                    statusBadge.className = 'pill-badge badge-success';
                    statusBadge.textContent = 'Step 4: Request Forwarded & Rendered in acknowledgement.jsp!';
                }
                if (stepModel) {
                    stepModel.style.borderColor = 'var(--border-card)';
                    stepModel.style.boxShadow = 'none';
                }

                // Process Ticket
                renderAcknowledgementResult(empId, empName, dept, category, desc, priority);
            }, 350);
        }, 350);
    }, 350);
}

/**
 * Render Acknowledgement Card & Add to Ticket Queue
 */
function renderAcknowledgementResult(empId, empName, dept, category, desc, priority) {
    requestCounter++;
    const ticketId = `SR-${requestCounter}`;
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

    let sla = 'Within 48-72 Hours (Normal SLA)';
    if (priority === 'High') sla = 'Within 4 Hours (Critical SLA)';
    else if (priority === 'Medium') sla = 'Within 24 Hours (Standard SLA)';

    let catIcon = '⚙️';
    if (category === 'Network') catIcon = '🌐';
    else if (category === 'Software') catIcon = '💻';
    else if (category === 'Hardware') catIcon = '🖥️';
    else if (category === 'Account') catIcon = '🔐';

    // Update Right Panel (acknowledgement.jsp)
    const elTicketId = document.getElementById('resTicketId');
    const elEmpId = document.getElementById('resEmpId');
    const elEmpName = document.getElementById('resEmpName');
    const elDept = document.getElementById('resDept');
    const elCategory = document.getElementById('resCategory');
    const elTimestamp = document.getElementById('resTimestamp');
    const elSla = document.getElementById('resSla');
    const elDesc = document.getElementById('resDesc');

    if (elTicketId) elTicketId.textContent = ticketId;
    if (elEmpId) elEmpId.textContent = empId;
    if (elEmpName) elEmpName.textContent = empName;
    if (elDept) elDept.textContent = dept;
    if (elCategory) elCategory.textContent = `${catIcon} ${category}`;
    if (elTimestamp) elTimestamp.textContent = timestamp;
    if (elSla) elSla.textContent = sla;
    if (elDesc) elDesc.textContent = desc;

    const prioBadge = document.getElementById('resPriority');
    if (prioBadge) {
        prioBadge.textContent = priority;
        prioBadge.className = 'pill-badge ' + (priority === 'High' ? 'badge-danger' : priority === 'Medium' ? 'badge-warning' : 'badge-success');
    }

    // Add to Ticket Table
    sampleTickets.unshift({
        id: ticketId,
        empId,
        name: empName,
        dept,
        category,
        priority,
        desc,
        timestamp,
        status: 'Open / In Queue',
        sla
    });

    renderTicketQueue();
    renderReport();
    showToast(`Ticket ${ticketId} created successfully for ${empName}!`, '🎫');
}

// =============================================================
// TICKET QUEUE TABLE, SEARCH, STATUS CHANGER & EXPORTS
// =============================================================
function initTicketQueue() {
    renderTicketQueue();

    const searchInput = document.getElementById('queueSearchInput');
    const catFilter = document.getElementById('queueCategoryFilter');
    const prioFilter = document.getElementById('queuePriorityFilter');

    if (searchInput) searchInput.addEventListener('input', renderTicketQueue);
    if (catFilter) catFilter.addEventListener('change', renderTicketQueue);
    if (prioFilter) prioFilter.addEventListener('change', renderTicketQueue);

    // CSV / JSON Export buttons
    const btnCsv = document.getElementById('btnExportCsv');
    if (btnCsv) btnCsv.addEventListener('click', exportTicketsCsv);

    const btnJson = document.getElementById('btnExportJson');
    if (btnJson) btnJson.addEventListener('click', exportTicketsJson);
}

function renderTicketQueue() {
    const tableBody = document.getElementById('ticketsTableBody');
    const badgeCount = document.getElementById('queueCountBadge');
    if (!tableBody) return;

    const searchVal = (document.getElementById('queueSearchInput')?.value || '').toLowerCase();
    const catVal = document.getElementById('queueCategoryFilter')?.value || 'ALL';
    const prioVal = document.getElementById('queuePriorityFilter')?.value || 'ALL';

    const filtered = sampleTickets.filter(t => {
        const matchesSearch = t.id.toLowerCase().includes(searchVal) ||
                              t.empId.toLowerCase().includes(searchVal) ||
                              t.name.toLowerCase().includes(searchVal) ||
                              t.desc.toLowerCase().includes(searchVal);

        const matchesCat = catVal === 'ALL' || t.category === catVal;
        const matchesPrio = prioVal === 'ALL' || t.priority === prioVal;

        return matchesSearch && matchesCat && matchesPrio;
    });

    if (badgeCount) {
        badgeCount.textContent = `Total Tickets: ${sampleTickets.length} (${filtered.length} visible)`;
    }

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; color: var(--text-dim); padding: 2rem;">
                    No service requests match the selected filters.
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = filtered.map(t => {
        const prioBadge = t.priority === 'High' ? 'badge-danger' : t.priority === 'Medium' ? 'badge-warning' : 'badge-success';
        let catIcon = '⚙️';
        if (t.category === 'Network') catIcon = '🌐';
        else if (t.category === 'Software') catIcon = '💻';
        else if (t.category === 'Hardware') catIcon = '🖥️';
        else if (t.category === 'Account') catIcon = '🔐';

        let statusBadge = 'badge-primary';
        if (t.status.includes('Resolved')) statusBadge = 'badge-success';
        else if (t.status.includes('Progress')) statusBadge = 'badge-warning';

        return `
            <tr>
                <td><strong style="color: #38bdf8; font-family: var(--font-mono);">${t.id}</strong></td>
                <td>
                    <div style="font-weight: 700; color: #ffffff;">${t.name}</div>
                    <div style="font-size: 0.78rem; color: var(--text-dim);"><code>${t.empId}</code></div>
                </td>
                <td>${t.dept}</td>
                <td>${catIcon} ${t.category}</td>
                <td><span class="pill-badge ${prioBadge}">${t.priority}</span></td>
                <td style="font-size: 0.82rem; color: #cbd5e1;">${t.sla}</td>
                <td>
                    <span class="pill-badge ${statusBadge}" style="cursor:pointer;" title="Click to cycle status" onclick="cycleTicketStatus('${t.id}')">
                        ${t.status} 🔄
                    </span>
                </td>
                <td>
                    <button class="btn btn-secondary" style="padding: 0.25rem 0.55rem; font-size: 0.75rem;" onclick="deleteTicket('${t.id}')" title="Delete Ticket">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

window.cycleTicketStatus = function(ticketId) {
    const ticket = sampleTickets.find(t => t.id === ticketId);
    if (!ticket) return;

    if (ticket.status.includes('Open')) {
        ticket.status = 'In Progress';
    } else if (ticket.status.includes('Progress')) {
        ticket.status = 'Resolved';
    } else {
        ticket.status = 'Open / In Queue';
    }

    playClickSound(600, 'sine', 0.04);
    renderTicketQueue();
    renderReport();
    showToast(`Updated ${ticketId} status to: ${ticket.status}`, '🔄');
};

window.deleteTicket = function(ticketId) {
    const idx = sampleTickets.findIndex(t => t.id === ticketId);
    if (idx !== -1) {
        sampleTickets.splice(idx, 1);
        playClickSound(400, 'sawtooth', 0.05);
        renderTicketQueue();
        renderReport();
        showToast(`Ticket ${ticketId} removed`, '🗑️');
    }
};

function exportTicketsCsv() {
    if (sampleTickets.length === 0) {
        showToast('No tickets to export!', '⚠️');
        return;
    }

    const headers = ['Ticket ID', 'Employee ID', 'Employee Name', 'Department', 'Category', 'Priority', 'SLA', 'Status', 'Timestamp', 'Description'];
    const rows = sampleTickets.map(t => [
        t.id,
        t.empId,
        `"${t.name}"`,
        `"${t.dept}"`,
        t.category,
        t.priority,
        `"${t.sla}"`,
        `"${t.status}"`,
        t.timestamp,
        `"${t.desc.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IT_Service_Tickets_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported tickets as CSV', '📊');
}

function exportTicketsJson() {
    if (sampleTickets.length === 0) {
        showToast('No tickets to export!', '⚠️');
        return;
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sampleTickets, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `IT_Service_Tickets_${new Date().toISOString().substring(0, 10)}.json`);
    dlAnchorElem.click();
    showToast('Exported tickets as JSON', '📦');
}

// =============================================================
// INTERACTIVE VIVA VOCE FLASHCARDS & FILTER
// =============================================================
function initVivaVoce() {
    const searchInput = document.getElementById('vivaSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const val = searchInput.value.toLowerCase();
            const items = document.querySelectorAll('.viva-card');
            items.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(val) ? 'block' : 'none';
            });
        });
    }

    // Toggle all answers button
    const btnToggleAll = document.getElementById('btnToggleAllViva');
    if (btnToggleAll) {
        let allOpen = false;
        btnToggleAll.addEventListener('click', () => {
            allOpen = !allOpen;
            document.querySelectorAll('.viva-body').forEach(b => {
                b.style.display = allOpen ? 'block' : 'none';
            });
            btnToggleAll.textContent = allOpen ? 'Collapse All' : 'Expand All';
        });
    }
}

window.toggleVivaCard = function(headerEl) {
    const body = headerEl.parentElement.querySelector('.viva-body');
    if (body) {
        const isHidden = window.getComputedStyle(body).display === 'none';
        body.style.display = isHidden ? 'block' : 'none';
        playClickSound(600, 'sine', 0.03);
    }
};

window.markVivaMastered = function(btn) {
    btn.classList.toggle('btn-success');
    btn.classList.toggle('btn-secondary');
    if (btn.classList.contains('btn-success')) {
        btn.innerHTML = '<span>✅</span> Mastered';
        showToast('Question marked as Mastered!', '🌟');
    } else {
        btn.innerHTML = '<span>📌</span> Mark Mastered';
    }
    updateVivaScore();
};

function updateVivaScore() {
    const mastered = document.querySelectorAll('.viva-card .btn-success').length;
    const total = document.querySelectorAll('.viva-card').length;
    const scoreBadge = document.getElementById('vivaMasteryBadge');
    if (scoreBadge && total > 0) {
        scoreBadge.textContent = `Mastery: ${mastered}/${total} Concept(s) (${Math.round((mastered / total) * 100)}%)`;
    }
}

// =============================================================
// COPY CODE HELPER
// =============================================================
window.copyCode = function(elementId) {
    const codeEl = document.getElementById(elementId);
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.innerText).then(() => {
        playClickSound(850, 'sine', 0.06);
        showToast('Code copied to clipboard!', '📋');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

// =============================================================
// REPORTS & ANALYTICS ENGINE
// =============================================================
const CATEGORY_META = {
    Network:  { icon: '🌐', barClass: 'bar-network'  },
    Software: { icon: '💻', barClass: 'bar-software' },
    Hardware: { icon: '🖥️', barClass: 'bar-hardware' },
    Account:  { icon: '🔐', barClass: 'bar-account'  },
    Other:    { icon: '⚙️', barClass: 'bar-other'    }
};

const PRIORITY_META = {
    High:   { icon: '🔴', barClass: 'bar-high',   badgeClass: 'badge-danger'  },
    Medium: { icon: '🟡', barClass: 'bar-medium',  badgeClass: 'badge-warning' },
    Low:    { icon: '🟢', barClass: 'bar-low',     badgeClass: 'badge-success' }
};

function initReports() {
    const searchInput = document.getElementById('reportSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => renderReport(searchInput.value));
    }

    const btnPdf = document.getElementById('btnExportPdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', exportReportAsPdf);
    }

    renderReport();
}

function renderReport(searchQuery = '') {
    const total = sampleTickets.length;

    const elTotal  = document.getElementById('statTotal');
    const elHigh   = document.getElementById('statHigh');
    const elMedium = document.getElementById('statMedium');
    const elLow    = document.getElementById('statLow');
    const elMost   = document.getElementById('statMostCommon');
    const elGenAt  = document.getElementById('reportGeneratedAt');

    const highCount   = sampleTickets.filter(t => t.priority === 'High').length;
    const mediumCount = sampleTickets.filter(t => t.priority === 'Medium').length;
    const lowCount    = sampleTickets.filter(t => t.priority === 'Low').length;

    // Count per category
    const catCounts = {};
    sampleTickets.forEach(t => {
        catCounts[t.category] = (catCounts[t.category] || 0) + 1;
    });

    let topCat = '—';
    let topCount = 0;
    Object.entries(catCounts).forEach(([cat, cnt]) => {
        if (cnt > topCount) { topCat = cat; topCount = cnt; }
    });

    if (elTotal)  elTotal.textContent  = total;
    if (elHigh)   elHigh.textContent   = highCount;
    if (elMedium) elMedium.textContent = mediumCount;
    if (elLow)    elLow.textContent    = lowCount;
    if (elMost)   elMost.textContent   = total > 0 ? (CATEGORY_META[topCat]?.icon || '') + ' ' + topCat : '—';
    if (elGenAt)  elGenAt.textContent  = 'Generated: ' + new Date().toLocaleString('en-IN');

    // ── Category bar chart ───────────────────────────────────
    const catBarsEl = document.getElementById('reportCategoryBars');
    if (catBarsEl) {
        const categories = ['Network', 'Software', 'Hardware', 'Account', 'Other'];
        const maxCat = Math.max(...categories.map(c => catCounts[c] || 0), 1);

        catBarsEl.innerHTML = categories.map(cat => {
            const cnt   = catCounts[cat] || 0;
            const pct   = total > 0 ? Math.round((cnt / total) * 100) : 0;
            const width = total > 0 ? Math.max(Math.round((cnt / maxCat) * 100), cnt > 0 ? 6 : 0) : 0;
            const meta  = CATEGORY_META[cat] || { icon: '⚙️', barClass: 'bar-other' };

            return `
                <div class="report-bar-row">
                    <div class="report-bar-label">${meta.icon} ${cat}</div>
                    <div class="report-bar-track">
                        <div class="report-bar-fill ${meta.barClass}" style="width: ${width}%">
                            ${cnt > 0 ? pct + '%' : ''}
                        </div>
                    </div>
                    <div class="report-bar-count">${cnt}</div>
                </div>
            `;
        }).join('');
    }

    // ── Priority bar chart ───────────────────────────────────
    const prioBarsEl = document.getElementById('reportPriorityBars');
    if (prioBarsEl) {
        const priorities  = ['High', 'Medium', 'Low'];
        const prioCounts  = { High: highCount, Medium: mediumCount, Low: lowCount };
        const maxPrio     = Math.max(highCount, mediumCount, lowCount, 1);

        prioBarsEl.innerHTML = priorities.map(prio => {
            const cnt   = prioCounts[prio];
            const pct   = total > 0 ? Math.round((cnt / total) * 100) : 0;
            const width = total > 0 ? Math.max(Math.round((cnt / maxPrio) * 100), cnt > 0 ? 6 : 0) : 0;
            const meta  = PRIORITY_META[prio];

            return `
                <div class="report-bar-row">
                    <div class="report-bar-label">${meta.icon} ${prio}</div>
                    <div class="report-bar-track">
                        <div class="report-bar-fill ${meta.barClass}" style="width: ${width}%">
                            ${cnt > 0 ? pct + '%' : ''}
                        </div>
                    </div>
                    <div class="report-bar-count">${cnt}</div>
                </div>
            `;
        }).join('');
    }

    // ── Detailed Timeline Table ──────────────────────────────
    const tbody = document.getElementById('reportTableBody');
    if (!tbody) return;

    const q = searchQuery.toLowerCase().trim();
    const filtered = q
        ? sampleTickets.filter(t =>
            t.id.toLowerCase().includes(q)         ||
            t.name.toLowerCase().includes(q)       ||
            t.empId.toLowerCase().includes(q)      ||
            t.category.toLowerCase().includes(q)   ||
            t.dept.toLowerCase().includes(q)       ||
            t.desc.toLowerCase().includes(q)
          )
        : sampleTickets;

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; color: var(--text-dim); padding: 2rem;">
                    ${total === 0
                        ? 'No requests submitted yet. Submit a request from the <strong>Live MVC Simulator</strong> tab.'
                        : 'No requests match your search query.'
                    }
                </td>
            </tr>`;
        return;
    }

    tbody.innerHTML = filtered.map((t, idx) => {
        const prioBadge = PRIORITY_META[t.priority]?.badgeClass || 'badge-info';
        const catIcon   = CATEGORY_META[t.category]?.icon || '⚙️';
        const shortDesc = t.desc.length > 80 ? t.desc.substring(0, 80) + '…' : t.desc;

        return `
            <tr>
                <td style="color: var(--text-dim); font-size: 0.82rem;">${idx + 1}</td>
                <td><strong style="color: #38bdf8; font-family: var(--font-mono);">${t.id}</strong></td>
                <td style="font-size: 0.82rem; color: #cbd5e1; white-space: nowrap;">${t.timestamp}</td>
                <td>
                    <div style="font-weight: 700; color: #fff;">${t.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-dim);"><code>${t.empId}</code></div>
                </td>
                <td style="font-size: 0.85rem;">${t.dept}</td>
                <td>${catIcon} ${t.category}</td>
                <td><span class="pill-badge ${prioBadge}">${t.priority}</span></td>
                <td style="font-size: 0.83rem; color: #cbd5e1;">${shortDesc}</td>
            </tr>
        `;
    }).join('');
}

function exportReportAsPdf() {
    const btn = document.getElementById('btnExportPdf');
    if (btn) {
        btn.textContent = '⏳ Preparing PDF...';
        btn.disabled = true;
    }

    setTimeout(() => {
        window.print();
        setTimeout(() => {
            if (btn) {
                btn.innerHTML = '<span>📄</span> Export as PDF';
                btn.disabled = false;
            }
        }, 1500);
    }, 200);
}
