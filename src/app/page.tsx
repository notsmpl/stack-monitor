import Layout from './layout';
import StockMonitor from "@/components/StockMonitor/StockMonitor";

export default function Home() {
    return (
        <Layout>
            <main className="app-container">
                <h1 className="text-2xl font-bold mb-4">Stock Market Monitor</h1>

                <StockMonitor/>
            </main>
        </Layout>
    );
}
