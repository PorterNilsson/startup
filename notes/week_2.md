# Week 2

## Git and Github

- Use `git diff` followed by `HEAD` or `HEAD~<number>` to compare commits.
- Use `git branch <name>` to create a new branch.
- Use `git checkout <branch name>` to changing working branch.
- After a number of commits (or a finished feature), return to the main branch and run `git merge <branch name>`.
- Use `git fetch` and `git status` to check for merge conflicts before pulling.
- Use `git log` to see commit history with associated hashes
- A typical git workflow will involve pulling, adding, committing, and pushing.

## Asking Questions

- Research in advance
- Write a summarizing title
- Introduce the problem
- Help others reproduce the problem
- Include all relevant tags (versioning information)
- Proofread
- Respond to feedback (especially initially to avoid an obvious error in the question)

## Discord

- Use whatever channel is appropriate for your question (likely mapped to the technology)
- Move to the TA help queue channel when requesting help

## The Console

- `pwd` - print working directory
- `ls -la` - print all files in the directory, including hidden ones, and their information
- `echo` - Output the parameters of the command
- `cd` - Change directory
- `mkdir` - Make directory
- `rmdir` - Remove directory
- `rm` - Remove file(s)
- `mv` - Move file(s)
- `cp` - Copy files
- `ls` - List files
- `curl` - Command line client URL browser
- `grep` - Regular expression search
- `find` - Find files
- `top` - View running processes with CPU and memory usage
- `df` - View disk statistics
- `cat` - Output the contents of a file
- `less` - Interactively output the contents of a file
- `wc` - Count the words in a file
- `ps` - View the currently running processes
- `kill` - Kill a currently running process
- `sudo` - Execute a command as a super user (admin)
- `ssh` - Create a secure shell on a remote computer
- `scp` - Securely copy files to a remote computer
- `history` - Show the history of commands
- `ping` - Check if a website is up
- `tracert` - Trace the connections to a website
- `dig` - Show the DNS information for a domain
- `man` - Look up a command in the manual

* * *

- `|` - Take the output from the command on the left and *pipe*, or pass, it to the command on the right
- `>` - Redirect output to a file. Overwrites the file if it exists
- `>>` - Redirect output to a file. Appends if the file exists

* * *

- `CTRL-R` - Use type ahead to find previous commands
- `CTRL-C` - Kill the currently running command

* * *

Assignment result from `cat other.txt` - "xxyy"

## Editors

- VI
    - Command mode and insert mode
    - | keystroke | meaning |
        | --- | --- |
        | `:h` | help |
        | `i` | enter insert mode. This will allow you to type and delete text. Use ESC to exit insert mode. No other commands will work while in insert mode. |
        | `u` | undo |
        | `CTRL-r` | redo |
        | `gg` | go to beginning of file |
        | `G` | go to end of file |
        | `/` | search for text that you type after / |
        | `n` | next search match |
        | `N` | previous search match |
        | `v` | visually select text |
        | `y` | yank or copy selected text to clipboard |
        | `p` | paste clipboard |
        | `CTRL-wv` | Split window vertically |
        | `CTRL-ww` | Toggle windows |
        | `CTRL-wq` | Close current window |
        | `:e` | Open a file. Type ahead available. If you open a directory you can navigate it in the window |
        | `:w` | write file (save) |
        | `:q` | quit. Use `:q!` to exit without saving |
        

## A brief history of web programming

Three Phases

1.  The formation of the internet that supports the communication of web applications
2.  The creation of HTML and HTTP that made it possible to shared hyperlinked documents (Web 1.0).
3.  The creation of CSS and JavaScript that enabled interactive web applications (Web 2.0).

- The Internet Engineering Task Force (IETF) defines the technical standards that specify how the physical network communicates.
- The Internet Corporation for Assigned Names and Numbers (ICANN) oversees both the Internet Protocol (IP) address space, and the Domain Name System (DNS).
- Example HTTP Request
    - ```HTTP
        GET /hypertext/WWW/Helping.html HTTP/1.1
        Host: info.cern.ch
        Accept: text/html
        ```
        
- Javascript follows the ECMAScript standard

## Technology Stack

- All technologies that you layer to create your application (usually ending with a web framework at the top)
- Our Stack: React > Caddy > AWS > Node.js > MongoDB

## The Internet

- A network of computers connected by various means (wires, wifi, etc)
- Each device must have an IP which is resolved by a DNS server
- "Once you have the IP address, you connect to the device it represents by first asking for a connection route to the device. A connection route consists of many hops across the network until the destination is dynamically discovered and the connection established. With the connection the transport and application layers start exchanging data."
- Use `traceroute` command line utility to determine hops taken to establish connection dynamically
- TCP/IP Model
    - | Layer | Example | Purpose |
        | --- | --- | --- |
        | Application | HTTPS | Functionality like web browsing |
        | Transport | TCP | Moving connection information packets |
        | Internet | IP  | Establishing connections |
        | Link | Fiber, hardware | Physical connections |
        

## AWS EC2

- Server Address: `http://34.233.99.1/`
- SSH Command: `ssh -i aws-porter-cs260-base.pem ubuntu@34.233.99.1`
    - Make sure working directory is the same as the .pem file
- Overview of what we did
    - Created an EC2 instance (t2.micro) and expose it to HTTP, HTTPS, and SSH ports
        - Used a pre-made image with ubuntu, caddy, etc
    - Created an Elastic IP and then associated it with our EC2 instance
    - SSH-ed into the server to test it with above command
        - \-i flag is used to signify private key should be used
        - chmod 600 was required (allow owner read, write, execute only) to use the key

## Domain Names

- Domain Name Hierarchy = `subdomain1.subdomain2.secondary.topLevelDomain`
- Use `whois example.com` to figure out information about who owns a domain, etc.
- Authoritative name servers do the vast majority of this work (only a few exist)
-  Record Types
    - A: Maps a domain straight to an IP
    - CNAME: Maps a domain to another domain
- You can set a time to live (TTL) on your domain for caching instructions

## Amazon Web Services - Route 53

- "The name server (NS) record contains the names of the authoritative name servers that authorize you to place DNS records in this DNS server. Those same authoritative name servers are listed with the registrar that you leased your domain name from. That way the authoritative name server can verify that the DNS records and the DNS registration match and are authorized to represent the domain name when defining DNS records."
- "The start of authority (SOA) record provides contact information about the owner of this domain name."
- What we did (Added two routes)
    - One route was normal and just covered the root domain (just pasted the IP in the value section)
    - One route was a wildcard (\*) and made it so all subdomains (unless explicitly defined) point to the root

## Caddy

- Reverse proxy / gateway
- Encrypts with LetsEncrypt and acts as an HTTP Server
- CaddyFile: stores location of static html pages

## HTTPS, TLS, and web certificates

- HTTPS works by the underlying transport protocol called TLS
- LetsEncrypt essentially gives out open source certificates
    - ACME Protocol
- What we did:
    - Edited Caddyfile to have the domain serve up the root
    - Edited Caddyfile with two subdomains which has it act as a reverse proxy to two different apps
    - Restarted Caddy
