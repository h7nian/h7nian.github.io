// Smooth scrolling for in-page links.
// A bare "#" is not a valid CSS selector, so it must be filtered out before
// reaching querySelector.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Keep the URL and the keyboard focus in step with the jump.
        history.replaceState(null, '', href);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
    });
});

// ==================== BibTeX dialog ====================

const citationModal = document.getElementById('citationModal');
const citationText = document.getElementById('citationText');
const closeButton = document.querySelector('.modal-close');
const copyButton = document.getElementById('copyCitation');
let lastFocused = null;

const citations = {
    'gualo': `@inproceedings{wang2026gualo,
  title={GUALO: A Generalizable Uncertainty-Aware AI Agent for Logic Optimization},
  author={Wang, Jingxin and Zhang, Sinian and Liang, Yun and Lin, Yibo and Ren, Pengpeng and Wang, Runsheng and Qian, Weikang},
  booktitle={IEEE/ACM International Conference on Computer-Aided Design (ICCAD)},
  year={2026}
}`,
    'antidiabetic_hf': `@article{jodlowskasiewert2026antidiabetic,
  title={Antidiabetic Drug Associations With Heart Failure Outcomes: Real-World Evidence Study Using Electronic Health Records},
  author={Jodlowska-Siewert, Elzbieta and Chen, Yunhui and Zhang, Sinian and Li, Jia and Dellavalle, Robert and Zhang, Rui and Hou, Jue},
  journal={JMIR Diabetes},
  volume={11},
  pages={e85083},
  doi={10.2196/85083},
  year={2026},
  publisher={JMIR Publications Toronto, Canada}
}`,
    'wasserstein': `@inproceedings{zhang2025wasserstein,
  title={Wasserstein Transfer Learning},
  author={Zhang, Kaicheng and Zhang, Sinian and Zhou, Doudou and Zhou, Yidong},
  booktitle={Advances in Neural Information Processing Systems},
  year={2025}
}`,
    'drkgc': `@inproceedings{xiao2025drkgc,
  title={DrKGC: Dynamic Subgraph Retrieval-Augmented LLMs for Knowledge Graph Completion across General and Biomedical Domains},
  author={Xiao, Yongkang and Zhang, Sinian and Dai, Yi and Zhou, Huixue and Hou, Jue and Ding, Jie and Zhang, Rui},
  booktitle={Findings of the Association for Computational Linguistics: EMNLP 2025},
  pages={16432--16445},
  doi={10.18653/v1/2025.findings-emnlp.892},
  year={2025}
}`,
    'ehr_tutorial': `@article{huang2025advancing,
  title={Advancing the Use of Longitudinal Electronic Health Records: Tutorial for Uncovering Real-World Evidence in Chronic Disease Outcomes},
  author={Huang, Feiqing and Hou, Jue and Zhou, Ningxuan and Greco, Kimberly and Lin, Chenyu and Sweet, Sara Morini and Wen, Jun and Shen, Lechen and Gonzalez, Nicolas and Zhang, Sinian and others},
  journal={Journal of Medical Internet Research},
  volume={27},
  pages={e71873},
  year={2025},
  publisher={JMIR Publications Toronto, Canada}
}`,
    'fuselinker': `@article{xiao2024fuselinker,
  title={FuseLinker: Leveraging LLM's pre-trained text embeddings and domain knowledge to enhance GNN-based link prediction on biomedical knowledge graphs},
  author={Xiao, Yongkang and Zhang, Sinian and Zhou, Huixue and Li, Mingchen and Yang, Han and Zhang, Rui},
  journal={Journal of Biomedical Informatics},
  volume={158},
  pages={104730},
  year={2024},
  publisher={Elsevier}
}`,
    'ehr_tutorial_2023': `@article{hou2023generate,
  title={Generate analysis-ready data for real-world evidence: tutorial for harnessing electronic health records with advanced informatic technologies},
  author={Hou, Jue and Zhao, Rachel and Gronsbell, Jessica and Lin, Yucong and Bonzel, Clara-Lea and Zeng, Qingyi and Zhang, Sinian and Beaulieu-Jones, Brett K and Weber, Griffin M and Jemielita, Thomas and others},
  journal={Journal of medical Internet research},
  volume={25},
  pages={e45662},
  year={2023},
  publisher={JMIR Publications Toronto, Canada}
}`,
    'activity_recognition': `@inproceedings{huang2023post,
  title={A post-processing machine learning for activity recognition challenge with OpenStreetMap data},
  author={Huang, Shiyao and Lyu, Junliang and Zhang, Sinian and Tang, Ruiying and Xiao, Huan and Zhang, Yuanyuan and Lu, Xiaoling},
  booktitle={Adjunct Proceedings of the 2023 ACM International Joint Conference on Pervasive and Ubiquitous Computing \& the 2023 ACM International Symposium on Wearable Computing},
  pages={557--562},
  year={2023}
}`,
    'wreaths': `@article{liang2024wreaths,
  title={The wreaths of KHAN: Uniform graph feature selection with false discovery rate control},
  author={Liang, Jiajun and Liu, Yue and Zhou, Doudou and Zhang, Sinian and Lu, Junwei},
  journal={arXiv preprint arXiv:2403.12284},
  year={2024}
}`,
    'selective_prediction': `@article{luo2026aligning,
  title={Aligning Language Models with Selective Prediction},
  author={Luo, Gaoxiang and Wu, Yifan and Zhang, Sinian and Deshwal, Aryan and Sun, Ju},
  journal={arXiv preprint arXiv:2607.03528},
  year={2026}
}`,
    'ad_worsening': `@article{venkatesh2026predicting,
  title={Predicting the timing of first sustained cognitive worsening in Alzheimer's disease using real-world clinical data and machine learning},
  author={Venkatesh, Shruthi and Zhang, Sinian and Zhu, Wen and Morris, Michele and Mercurio, Rocco and Berman, Sarah B and Mathys, Hansruedi and Olsen, Abby L and Shaaban, C. Elizabeth and Visweswaran, Shyam and Lopez, Oscar L and Cai, Tianxi and Hou, Jue and Xia, Zongqi},
  journal={medRxiv},
  doi={10.64898/2026.06.02.26354764},
  year={2026}
}`,
    'glmdp': `@article{zhang2025generalized,
  title={Generalized Linear Markov Decision Process},
  author={Zhang, Sinian and Zhang, Kaicheng and Xu, Ziping and Cai, Tianxi and Zhou, Doudou},
  journal={arXiv preprint arXiv:2506.00818},
  year={2025}
}`
};

function openCitation(key) {
    lastFocused = document.activeElement;
    citationText.textContent = citations[key] || 'Citation not available.';
    citationModal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
}

function closeCitation() {
    citationModal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.cite-btn').forEach(button => {
    button.addEventListener('click', () => openCitation(button.dataset.citation));
});

closeButton.addEventListener('click', closeCitation);

// Clicking the backdrop, but not the dialog itself, dismisses it.
citationModal.addEventListener('click', event => {
    if (event.target === citationModal) closeCitation();
});

document.addEventListener('keydown', event => {
    if (citationModal.hidden) return;

    if (event.key === 'Escape') {
        closeCitation();
        return;
    }

    // Keep Tab focus inside the dialog while it is open.
    if (event.key === 'Tab') {
        const focusable = citationModal.querySelectorAll('button, [href]');
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

copyButton.addEventListener('click', () => {
    const text = citationText.textContent;

    const done = () => {
        const original = copyButton.textContent;
        copyButton.textContent = 'Copied';
        setTimeout(() => { copyButton.textContent = original; }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
        fallback();
    }

    // execCommand path, still needed for older Safari.
    function fallback() {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(area);
        area.select();
        try {
            if (document.execCommand('copy')) done();
        } catch (err) {
            console.error('Copy failed:', err);
        }
        document.body.removeChild(area);
    }
});
