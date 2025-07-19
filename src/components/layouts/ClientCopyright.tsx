import { IconFacebook, IconTelegram, IconUpwork } from "../icons";

const ClientCopyright = () => {
  return (
    <div className="py-3 border-t border-gray-300 dark:border-gray-600 bg-blue-500/30 dark:bg-blue-800/40">
      <div className="px-10 lg:px-30 xl:px-60 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Kazu. All rights reserved.
        </p>
        <div className="flex items-center gap-x-2">
          <a
            href="https://www.facebook.com/iamkazuu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
          >
            <IconFacebook width={20} height={20} />
          </a>
          <a
            href="https://t.me/Imkazu0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
          >
            <IconTelegram width={20} height={20} />
          </a>
          <a
            href="https://upwork.com/freelancers/~01698b265175ff407b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
          >
            <IconUpwork width={20} height={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientCopyright;
