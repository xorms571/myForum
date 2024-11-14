import { useNavigate } from "react-router-dom";
import { useCreate } from "../utils/CreateFunctions";

const CreatePost = () => {
  const navigate = useNavigate();
  const {
    content,
    handleFileChange,
    handleSubmit,
    setContent,
    setTitle,
    title,
  } = useCreate();

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full flex flex-col justify-between"
    >
      <div className="flex justify-between mb-4 font-bold">
        <h2 className="text-lg font-bold">게시물 작성</h2>
        <button onClick={() => navigate("/")}>뒤로가기</button>
      </div>
      <div className="bg-white bg-opacity-80 flex flex-col gap-4 p-4 shadow rounded-lg h-full justify-between">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-white border rounded-lg px-4 py-2 text-sm"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="bg-white h-full border rounded-lg px-4 py-2 text-sm overflow-y-scroll"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="bg-white border rounded-lg px-4 py-2 text-sm"
        />
        <div className="text-end">
          <button type="submit">완료</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
