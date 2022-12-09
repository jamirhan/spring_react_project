import * as React from "react";

type ResponseProps = {
  from_id: number;
  text: string;
};

export default function Response(props: ResponseProps) {
  return (
    <div>
      <p>{props.text}</p>
    </div>
  );
}
