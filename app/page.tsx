"use client";
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0ea5e9", "#22c55e", "#facc15", "#f97316", "#a855f7"];

const overviewData = [
  { metric: "Net Worth", value: 542000 },
  { metric: "FI Progress Tier 1", value: 29 },
  { metric: "FI Progress Tier 2", value: 22 },
  { metric: "Crypto Exposure", value: 27 },
  { metric: "Cash Buffer (Months)", value: 6.2 },
  { metric: "Savings Rate (%)", value: 30 },
  { metric: "Vacation Spend YTD", value: 10200 },
];

const netWorthData = [
  { month: "Jan", value: 490000 },
  { month: "Feb", value: 505000 },
  { month: "Mar", value: 518000 },
  { month: "Apr", value: 525000 },
  { month: "May", value: 536000 },
  { month: "Jun", value: 542000 },
];

const portfolioData = [
  { name: "Equities", current: 43, target: 55 },
  { name: "Bonds", current: 0, target: 10 },
  { name: "Crypto", current: 27, target: 15 },
  { name: "Cash/Stablecoins", current: 29, target: 15 },
  { name: "Gold", current: 2, target: 5 },
];

export default function Page() {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 xl:grid-cols-2">
      {overviewData.map((item, idx) => (
        <Card key={idx} className="shadow-md">
          <CardContent className="py-4">
            <div className="text-sm font-medium text-gray-500 mb-1">
              {item.metric}
            </div>
            {item.metric.includes("FI") ||
            item.metric.includes("Rate") ||
            item.metric.includes("Exposure") ? (
              <Progress value={item.value} className="h-3" />
            ) : (
              <div className="text-2xl font-bold">
                {typeof item.value === "number"
                  ? `$${item.value.toLocaleString()}`
                  : item.value}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="col-span-full">
        <Card className="shadow-md">
          <CardContent className="py-6">
            <div className="text-lg font-semibold mb-3">Net Worth Over Time</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={netWorthData}>
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-full">
        <Card className="shadow-md">
          <CardContent className="py-6">
            <div className="text-lg font-semibold mb-3">
              Portfolio Allocation vs Target
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">Current Allocation</div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      dataKey="current"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      {portfolioData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Target Allocation</div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      dataKey="target"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      {portfolioData.map((_, index) => (
                        <Cell
                          key={`cell-target-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
