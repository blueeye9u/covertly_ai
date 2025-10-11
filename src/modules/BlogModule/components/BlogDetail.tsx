import { useRouter } from 'next/router'
import { BlogsData } from '../../../constants/blogs-data'
import GeminiModule from '../../GeminiModule/GeminiModule';
import ChatgptModule from '../../ChatgptModule/ChatgptModule';
import LlamaModule from '../../LlamaModule/LlamaModule';
import ClaudeModule from '../../ClaudeModule/ClaudeModule';

const BlogDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Get the blog ID from the URL

    const blog = BlogsData.find((b) => b.id === id);

    if (!blog) {
        return <p className="text-center mt-10">Blog not found...</p>;
    }

    return (
        <div className='container-landingpage py-10 pb-20 md:py-20 lg:py-[110px]'>
            <div className='flex flex-col justify-center items-center w-full mb-5'>
                <button className='px-4 py-2 mb-3 text-sm rounded-full bg-[#30C5D21F] text-[#30C5D2] mx-auto cursor-default'>{blog.category}</button>
                <h4 className='fs-64 text-center max-w-[1100px] mx-auto leading-tight mb-4'>{blog.title}</h4>
                <span className='block mb-8 text-center'>{blog.date}</span>
            </div>

            {blog.id==="ai-vs-gemini"&&<GeminiModule/>}
            {blog.id==="ai-vs-chat-gpt"&&<ChatgptModule/>}
            {blog.id==="ai-vs-llama"&&<LlamaModule/>}
            {blog.id==="ai-vs-claude"&&<ClaudeModule/>}
            
        </div>
    )
}

export default BlogDetail
