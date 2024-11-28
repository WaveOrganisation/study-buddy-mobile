import { useEffect } from "react";
import { useServerHealthStore } from "@/stores/useServerHealthStore";
import checkIsServerHealthy from "@/utils/queries/checkIsServerHealthy";
import { TimeUtils } from "@/utils/timeUtils";

export function useServerHealth() {
  const { isHealthy, setHealth } = useServerHealthStore();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await checkIsServerHealthy();
      } catch (error) {
        setHealth(false);
        // Alert.alert(
        //   "Server Unreachable",
        //   "The server is currently unavailable. Some features may not work.",
        //   [{ text: "Retry", onPress: () => "" }]
        // );
        console.error("Server might not be healthy");
      }
    };

    // Perform initial health check
    const interval = setInterval(checkHealth, TimeUtils.seconds(10));

    return () => clearInterval(interval); // Cleanup on unmount
  }, [setHealth]);

  return isHealthy;
}
