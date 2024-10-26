import { GiCardPickup } from "react-icons/gi";
import { GiBootKick } from "react-icons/gi";

const ActivityTable = ({ students, onSelectedStudent, onDiscardStudent }) => {
  return (
    <div>
      <table className='min-w-full table-fixed border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-red-900'>
            <th className='w-1/12 border border-gray-300 px-4 py-2 text-white font-serif'>
              #
            </th>
            <th className='w-4/12 border border-gray-300 px-4 py-2 text-white font-serif'>
              First Name
            </th>
            <th className='w-4/12 border border-gray-300 px-4 py-2 text-white font-serif'>
              Last Name
            </th>
            <th className='w-2/12 border border-gray-300 px-4 py-2 text-white font-serif'>
              Gender
            </th>
            <th className='w-2/12 border border-gray-300 px-4 py-2 text-white font-serif'>
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id}>
                <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                  {index + 1}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                  {student.first_name}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                  {student.last_name}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                  {student.gender}
                </td>
                <td className='flex border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                  <button onClick={() => onSelectedStudent(student)}>
                    <GiCardPickup className='text-[38px] bg-green-600 text-white hover:bg-green-500 hover:text-white duration-300 p-1 rounded-md mr-1' />
                  </button>
                  <button onClick={() => onDiscardStudent(student.id)}>
                    <GiBootKick className='text-[38px] bg-red-600 text-white hover:bg-red-500 duration-300 p-1 rounded-md' />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan='5'
                className='border border-gray-300 px-4 py-2 text-center bg-gray-200 font-serif'>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
