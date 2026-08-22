import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Experiment 9: Servlet Lifecycle Demonstration Application
 * Demonstrates execution behavior and counters for Constructor, init(), service(), doGet(), and destroy().
 */
@WebServlet("/lifecycle")
public class LifecycleServlet extends HttpServlet {

    // Counters tracking execution phases across requests (do NOT reset per request)
    private static final AtomicInteger constructorCount = new AtomicInteger(0);
    private static final AtomicInteger initCount = new AtomicInteger(0);
    private static final AtomicInteger serviceCount = new AtomicInteger(0);
    private static final AtomicInteger doGetCount = new AtomicInteger(0);
    private static final AtomicInteger destroyCount = new AtomicInteger(0);

    private String initTimestamp;

    // 1. Constructor Phase (Executes ONCE on servlet instantiation)
    public LifecycleServlet() {
        super();
        constructorCount.incrementAndGet();
        System.out.println("[LifecycleServlet] Constructor called. Total: " + constructorCount.get());
    }

    // 2. Initialization Phase (Executes ONCE after instantiation)
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        initCount.incrementAndGet();
        initTimestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("hh:mm:ss a"));
        System.out.println("[LifecycleServlet] init() called. Total: " + initCount.get());
    }

    // 3. Service Phase (Executes on EVERY client request)
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        serviceCount.incrementAndGet();
        System.out.println("[LifecycleServlet] service() called. Total: " + serviceCount.get());
        super.service(req, resp);
    }

    // 4. doGet Request Processing Phase
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        doGetCount.incrementAndGet();
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Experiment 9 - Lifecycle Monitor</title>");
        out.println("<style>");
        out.println("body { font-family: 'Segoe UI', sans-serif; background-color: #0f172a; color: #f8fafc; padding: 2rem; }");
        out.println(".card { max-width: 750px; margin: 1rem auto; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 2rem; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }");
        out.println("h2 { color: #6366f1; border-bottom: 2px solid rgba(99,102,241,0.3); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }");
        out.println(".grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }");
        out.println(".metric-box { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1.25rem; text-align: center; }");
        out.println(".metric-val { font-size: 2rem; font-weight: 800; color: #38bdf8; }");
        out.println(".metric-lbl { font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; font-weight: 600; margin-top: 0.25rem; }");
        out.println(".info-box { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.92rem; }");
        out.println(".btn { display: inline-block; padding: 0.65rem 1.25rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='card'>");
        out.println("<h2>Experiment 9: Servlet Lifecycle Phase Monitor</h2>");
        
        out.println("<div class='info-box'>");
        out.println("<strong style='color:#a5b4fc; font-size:1rem; display:block; margin-bottom:0.4rem;'>Observed Lifecycle Rules:</strong>");
        out.println("Refresh this browser page (F5) multiple times. Notice that <strong>service() Count</strong> and <strong>doGet() Count</strong> increment on every request, but <strong>Constructor Count</strong> and <strong>init() Count</strong> remain fixed at <strong>1</strong> because Tomcat creates only ONE instance of the Servlet!");
        out.println("</div>");

        out.println("<div class='grid-4'>");
        
        out.println("<div class='metric-box'>");
        out.println("<div class='metric-val' style='color:#a5b4fc;'>" + constructorCount.get() + "</div>");
        out.println("<div class='metric-lbl'>Constructor</div>");
        out.println("</div>");

        out.println("<div class='metric-box'>");
        out.println("<div class='metric-val' style='color:#34d399;'>" + initCount.get() + "</div>");
        out.println("<div class='metric-lbl'>init() Executed</div>");
        out.println("</div>");

        out.println("<div class='metric-box'>");
        out.println("<div class='metric-val' style='color:#38bdf8;'>" + serviceCount.get() + "</div>");
        out.println("<div class='metric-lbl'>service() Count</div>");
        out.println("</div>");

        out.println("<div class='metric-box'>");
        out.println("<div class='metric-val' style='color:#f472b6;'>" + doGetCount.get() + "</div>");
        out.println("<div class='metric-lbl'>doGet() Count</div>");
        out.println("</div>");

        out.println("</div>");

        out.println("<div style='background:rgba(15,23,42,0.6); padding:1rem; border-radius:8px; margin-bottom:1.5rem; font-size:0.9rem;'>");
        out.println("<div><strong>Servlet Instantiated At:</strong> " + initTimestamp + "</div>");
        out.println("<div style='margin-top:0.3rem;'><strong>destroy() Status:</strong> <span style='color:#fbbf24;'>" + (destroyCount.get() > 0 ? "Destroyed (" + destroyCount.get() + " times)" : "Active (destroy() executes on Tomcat shutdown/redeploy)") + "</span></div>");
        out.println("</div>");

        out.println("<div style='display:flex; gap:1rem;'>");
        out.println("<a href='lifecycle' class='btn'>🔄 Refresh Page (Trigger doGet)</a>");
        out.println("<a href='index.html' class='btn' style='background:#334155;'>← Back to Index</a>");
        out.println("</div>");

        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }

    // 5. Destruction Phase (Executes when servlet is taken out of service)
    @Override
    public void destroy() {
        destroyCount.incrementAndGet();
        System.out.println("[LifecycleServlet] destroy() called. Total: " + destroyCount.get());
        super.destroy();
    }
}
