import { RiCheckFill } from "react-icons/ri";
import { HiXMark } from "react-icons/hi2";

function PlansTable() {
  return (
    <table className="table-auto w-4/5 ml-16 text-left">
      <thead>
        <tr>
          {/* <th>Monthly price after free month ends 1/1/2019</th> */}
          {/* TODO: I don't like how this text looks */}
          <th></th>
          <th>BASIC</th>
          <th>STANDARD</th>
          <th>PREMIUM</th>
        </tr>
      </thead>
      <tbody className="">
        <tr className="bg-[#222222]">
          <td>HD available</td>
          <td>
            <HiXMark />
          </td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
        </tr>
        <tr>
          <td>Ultra HD available</td>
          <td>
            <HiXMark />
          </td>
          <td>
            <HiXMark />
          </td>
          <td>
            <RiCheckFill />
          </td>
        </tr>
        <tr className="bg-[#222222]">
          <td>Screens you can watch on at the same time</td>
          <td>1</td>
          <td>2</td>
          <td>4</td>
        </tr>

        <tr>
          <td>Watch on your laptop, TV, phone and tablet</td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
        </tr>

        <tr className="bg-[#222222]">
          <td>Unlimited movies and TV shows</td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
        </tr>

        <tr>
          <td>Cancel anytime</td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
        </tr>
        <tr className="bg-[#222222]">
          <td>First month free</td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
          <td>
            <RiCheckFill />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default PlansTable;
