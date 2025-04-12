import events from "../data/Events";

export interface Events {
  id: number;
  image: string;
}

const useEvents = () => ({ data: events });

export default useEvents;
