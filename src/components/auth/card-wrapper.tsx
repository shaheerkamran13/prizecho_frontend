import { Card, CardContent, CardHeader } from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card className="h-full w-[300px] bg-background shadow-md mobileM:w-[350px] xs:w-[400px] md:w-[400px]">
      <CardHeader>
        <h2 className="text-center text-2xl font-semibold -mb-4">{headerLabel}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
