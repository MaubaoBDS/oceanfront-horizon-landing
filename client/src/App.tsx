import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AdminLeads from "./pages/AdminLeads";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/thank-you"} component={ThankYou} />
      <Route path={"/admin/leads"} component={AdminLeads} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
